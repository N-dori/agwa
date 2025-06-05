import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

valid_unit = [{
    "id": "unit1",
    "pods": [{"id": "123", "age": 3}],
    "readings": [{
        "id": "r1",
        "pH": 6.5,
        "temp": 22.3,
        "ec": 1.5,
        "timestamp": "2025-06-05T12:00:00"
    }]
}]

invalid_unit = [{
    "id": "unit2",
    "pods": [{"id": "pod2", "age": 4}],
    "readings": [{
        "id": "r2",
        "pH": 4.9,
        "temp": 20.1,
        "ec": 1.4,
        "timestamp": "2025-06-05T12:05:00"
    }]
}]


def test_valid_post_units():
    response = client.post("/api/sensor", json=valid_unit)
    assert response.status_code == 200
    data = response.json()
    assert data[0]['validation']['classification'] == 'Healthy'


def test_invalid_post_units_classification():
    response = client.post("/api/sensor", json=invalid_unit)
    assert response.status_code == 200
    data = response.json()
    assert data[0]['validation']['classification'] == 'Needs Attention'


def test_alerts_endpoint_for_invalid_readings():
    client.post("/api/sensor", json=invalid_unit)

    response = client.get("/api/alerts", params={"unitId": "unit2"})
    assert response.status_code == 200
    alerts = response.json()
    assert len(alerts) == 1
    assert alerts[0]["pH"] < 5.5


def test_alerts_endpoint_with_no_alerts():
    client.post("/api/sensor", json=valid_unit)
    response = client.get("/api/alerts", params={"unitId": "unit1"})
    assert response.status_code == 200
    assert response.json() == []


def test_alerts_missing_unit():
    response = client.get("/api/alerts", params={"unitId": "unknown"})
    assert response.status_code == 200
    assert response.json() == []

def test_alerts_are_in_the_right_order_by_timestamps():
    unit = [{
        "id": "unit3",
        "pods": [{"id": "pod3", "age": 2}],
        "readings": [
            {
                "id": "r3a",
                "pH": 4.8,
                "temp": 21.0,
                "ec": 1.2,
                "timestamp": "2025-06-05T13:00:00"
            },
            {
                "id": "r3b",
                "pH": 4.7,
                "temp": 20.5,
                "ec": 1.1,
                "timestamp": "2025-06-05T12:00:00"
            }
        ]
    }]
    client.post("/api/sensor", json=unit)
    response = client.get("/api/alerts", params={"unitId": "unit3"})
    assert response.status_code == 200
    alerts = response.json()
    assert len(alerts) == 2
    assert alerts[0]["timestamp"] > alerts[1]["timestamp"]

def test_malformed_json():
    malformed_json = '{"id": "unit123", "pods": [{"id": "pod4", "age": 1}], "readings": [{"id": "r4", "pH": 6.0, "temp": 20.0, "ec": 1.0, "timestamp": "2025-06-05T14:00:00"}]'
    response = client.post(
        "/api/sensor",
        content=malformed_json,
        headers={"Content-Type": "application/json"}
    )
    assert response.status_code in (400, 422)

#-One test - not implemented in code :
#-system can detect and report when a unit has been in a "Needs Attention" state for more than 3 hours this point at persistent issue.
#-Maybe that can alert that some thing is wrong with the system that is to fix the bad readings
def test_unit_needs_attention_for_more_than_3_hours():
    unit = [{
        "id": "unit4",
        "pods": [{"id": "pod4", "age": 1}],
        "readings": [
            {
                "id": "r4a",
                "pH": 4.8,
                "temp": 21.0,
                "ec": 1.2,
                "timestamp": "2025-06-05T10:00:00"
            },
            {
                "id": "r4b",
                "pH": 4.7,
                "temp": 20.5,
                "ec": 1.1,
                "timestamp": "2025-06-05T12:00:00"
            },
            {
                "id": "r4c",
                "pH": 4.6,
                "temp": 20.0,
                "ec": 1.0,
                "timestamp": "2025-06-05T13:30:00"
            }
        ]
    }]
    client.post("/api/sensor", json=unit)
    response = client.get("/api/alerts", params={"unitId": "unit4"})
    assert response.status_code == 200
    alerts = response.json()
    assert len(alerts) == 3
    # Check that the time difference between first and last alert is more than 3 hours
    from datetime import datetime
    t0 = datetime.fromisoformat(alerts[-1]["timestamp"])
    t2 = datetime.fromisoformat(alerts[0]["timestamp"])
    assert (t2 - t0).total_seconds() > 3 * 3600