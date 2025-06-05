import { jsx as _jsx } from "react/jsx-runtime";
export const UserMsg = ({ txt }) => {
    return (_jsx("div", { className: `user-msg ${txt ? 'active' : ''} flex-jc-ac`, children: txt }));
};
