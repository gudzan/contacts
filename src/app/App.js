import React, { useState } from "react";

import api from "./api/index.js";
import Users from "./components/users.jsx";

export default function App() {
    return (
        <div className="m-5">
            <Users />
        </div>
    );
}
