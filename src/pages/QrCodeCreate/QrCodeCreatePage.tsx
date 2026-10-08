import React, { useState, useRef } from "react";
import QRCode from "react-qr-code";

const QrCodeCreatePage: React.FC = () => {
    const [text, setText] = useState("https://example.com");
    const [size, setSize] = useState(220);
    const [fgColor, setFgColor] = useState("#000000");
    const [bgColor, setBgColor] = useState("#ffffff");

    const qrRef = useRef<HTMLDivElement>(null);

    const downloadQR = () => {
        const svg = qrRef.current?.querySelector("svg");
        if (!svg) return;

        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const img = new Image();
        img.onload = () => {
            canvas.width = size;
            canvas.height = size;
            ctx?.drawImage(img, 0, 0);

            const pngFile = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.download = "qr-code.png";
            link.href = pngFile;
            link.click();
        };

        img.src = "data:image/svg+xml;base64," + btoa(svgData);
    };

    return (
        <div style={{ textAlign: "center" }}>
            <h2>React QR Code Generator</h2>

            <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter URL or Text"
                style={{ padding: 10, width: 300 }}
            />

            <div style={{ marginTop: 10 }}>
                <label>Size: </label>
                <input
                    type="number"
                    value={size}
                    onChange={(e) => setSize(Number(e.target.value))}
                />
            </div>

            <div style={{ marginTop: 10 }}>
                <label>Foreground: </label>
                <input
                    type="color"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                />
            </div>

            <div style={{ marginTop: 10 }}>
                <label>Background: </label>
                <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                />
            </div>

            <div
                ref={qrRef}
                style={{
                    background: bgColor,
                    padding: 20,
                    display: "inline-block",
                    marginTop: 20
                }}
            >
                <QRCode value={text} size={size} fgColor={fgColor} bgColor={bgColor} />
            </div>

            <br />

            <button
                onClick={downloadQR}
                style={{ marginTop: 20, padding: "10px 20px", cursor: "pointer" }}
            >
                Download QR
            </button>
        </div>
    );
};

export default QrCodeCreatePage;