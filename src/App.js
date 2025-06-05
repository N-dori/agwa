import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MonitorIndex } from './views/MonitorIndex';
import { AppHeader } from './components/AppHeader';
function App() {
    return (_jsxs("main", { className: "main-layout grid", children: [_jsx(AppHeader, {}), _jsx(MonitorIndex, {})] }));
}
export default App;
