import React from "react";
import * as utils from "../utils/utils.js";

export default function SearchStatus(props) {
    return (
        <p className="mb-4 fs-2">
            {props.length !== 0
                ? utils.renderPhrase(
                      props.length,
                      "юзер",
                      "юзера",
                      "юзеров",
                      "в базе"
                  )
                : "Никого нет, ты всех удалил :("}
        </p>
    );
}
