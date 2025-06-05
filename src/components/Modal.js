import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { modalTypes } from '../utils/modal';
import { ProblematicReadingsTable } from './problematicReadings/ProblematicReadingsTable';
export const Modal = ({ type, setIsModalShown, problematicReadings, selectedUnit }) => {
    const getBtnTxt = () => {
        return type === modalTypes.INTRO ?
            'Start Technical Exercise'
            :
                'Back';
    };
    return (type === modalTypes.INTRO ?
        _jsxs("section", { className: "modal-container center", children: [_jsx("h2", { children: " Self-Introduction & Growth " }), _jsx("p", { children: "Hi AGWA, I'm Nadav Dori :)" }), _jsx("p", { children: "I believe I\u2019m a great fit for the developer role at Agwa for several reasons:" }), _jsxs("ul", { children: [_jsx("li", { children: "After reading the articles on your website, I was truly impressed by the technological capabilities of your growing unit \u2014 specifically, how it can precisely adapt the living conditions for each plant and deliver high-quality results. This kind of innovation fascinates me personally." }), _jsx("li", { children: "As a yoga practitioner and a father, I deeply resonate with the philosophy that when we provide our bodies with the right conditions \u2014 proper nutrition, sleep, and movement \u2014 we unlock our full potential. In that same spirit, I find it inspiring that your technology can deliver fresh hydroponic produce to crews in remote locations like gas rigs and vessels, improving their well-being and overall morale. It\u2019s a beautiful, smart solution, and I would be honored to contribute to such a meaningful project." }), _jsx("li", { children: "If accepted, I\u2019m eager to grow, learn, solve problems, deliver real value, and help the company succeed in any challenge it faces." })] }), _jsx("button", { className: "btn center", onClick: () => setIsModalShown(false), children: getBtnTxt() })] })
        :
            _jsx("section", { className: "modal-container inspect", children: _jsx(ProblematicReadingsTable, { problematicReadings: problematicReadings, selectedUnit: selectedUnit, setIsModalShown: setIsModalShown }) }));
};
