"use client";
import React, { useEffect } from "react";

function I() {
    const username = "aayushsiwa";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `/api/github-data?username=${username}`
                );
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [username]);

    return <div></div>;
}

export default I;
