"use client";
import { useEffect, useState } from "react";

const roles = [
    "React.js Developer",
    "Next.js Engineer",
    "Frontend Architect",
    "UI/UX Enthusiast",
    "Full Stack Developer",
];

export default function TypeWriter() {
    const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
    const [currentText, setCurrentText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentRole = roles[currentRoleIndex];
        let timeout;

        if (!isDeleting && currentText === currentRole) {
            timeout = setTimeout(() => setIsDeleting(true), 2000);
        } else if (isDeleting && currentText === "") {
            setIsDeleting(false);
            setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        } else {
            timeout = setTimeout(
                () => {
                    setCurrentText(
                        isDeleting
                            ? currentRole.substring(0, currentText.length - 1)
                            : currentRole.substring(0, currentText.length + 1)
                    );
                },
                isDeleting ? 40 : 80
            );
        }

        return () => clearTimeout(timeout);
    }, [currentText, isDeleting, currentRoleIndex]);

    return (
        <span className="typewriter-text">
            {currentText}
            <span className="typewriter-cursor">|</span>
        </span>
    );
}
