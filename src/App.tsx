import "./index.css";
import { useRef, useState, useEffect } from "react";
import * as fabric from "fabric";

function App() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);

    useEffect(() => {
        if (canvasRef.current) {
            const initCanvas = new fabric.Canvas(canvasRef.current, {
                width: 500,
                height: 500,
            });

            initCanvas.renderAll();
            setCanvas(initCanvas);

            return () => {
                initCanvas.dispose();
            };
        }
    }, []);

    const handleAddImage = (e) => {
        const file = e.target.files[0];

        if (!file) {
            console.error("No file selected.");
            return;
        }

        const reader = new FileReader();

        reader.onload = (event) => {
            const imageUrl = event.target?.result;

            if (!imageUrl) {
                console.error("Failed to read the file.");
                return;
            }

            const imageElement = new Image();
            imageElement.src = imageUrl;

            imageElement.onload = () => {
                const fabricImage = new fabric.Image(imageElement);

                if (canvas) {
                    canvas.add();
                    canvas.add(fabricImage);
                    canvas.centerObject(fabricImage);
                    canvas.setActiveObject(fabricImage);
                    canvas.renderAll();
                }
            };

            imageElement.onerror = () => {
                console.error("Failed to load the image.");
            };
        };

        reader.onerror = () => {
            console.error("Error reading the file.");
        };

        reader.readAsDataURL(file);
    };

    const addGlasses = () => {
        const imageUrl = "/0g_glasses.png";

        const imageElement = new Image();
        imageElement.src = imageUrl;

        imageElement.onload = () => {
            const fabricImage = new fabric.Image(imageElement);

            if (canvas) {
                canvas.add(fabricImage);
                canvas.bringObjectToFront(fabricImage);
                canvas.centerObject(fabricImage);
                canvas.setActiveObject(fabricImage);
                canvas.renderAll();
            }
        };
    };

    const saveCanvasAsImage = (
        canvas: fabric.Canvas,
        fileName: string = "canvas_image.png"
    ) => {
        if (!canvas) {
            console.error("Canvas not initialized.");
            return;
        }

        const dataUrl = canvas.toDataURL({
            format: "png",
            quality: 1,
            multiplier: 1,
        });

        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleClearCanvas = () => {
        if (canvas) {
            canvas.clear();
        }
    };

    return (
        <main className="max-w-5xl mx-auto">
            <header className="flex justify-center py-4">
                <div className="flex flex-col gap-5 items-center justify-center">
                    <img src="/logo.svg" alt="logo" className="max-w-40" />
                    <h1 className="font-semibold text-4xl text-purple">
                        0G avatar builder
                    </h1>
                </div>
            </header>

            <canvas ref={canvasRef} className="border-2" />
            <input type="file" accept="image/*" onChange={handleAddImage} />
            <button onClick={handleClearCanvas}>Clear</button>
            <button onClick={addGlasses} className="cursor bg-red-400">
                GLasses
            </button>
            <button
                onClick={() =>
                    saveCanvasAsImage(canvas!, "my_canvas_image.png")
                }
            >
                Download👓
            </button>
        </main>
    );
}

export default App;
