import React from "react";

export default function CommentaryItems({logs}) {

    if (! logs.length) {
        return <li>No moves yet.</li>
    }

    return logs.map((log, index) =>
        <li key={index}>
            <span role="img" aria-label="flash icon">⚡</span> {log}
        </li>
    );
}