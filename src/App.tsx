import "./index.css";
import { useRef, useState, useEffect } from "react";
import * as fabric from "fabric";

function App() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
    const [isImageAdded, setIsImageAdded] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);

    useEffect(() => {
        if (canvasRef.current && isImageAdded) {
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
    }, [isImageAdded]);

    useEffect(() => {
        if (canvas && imageFile) {
            const img = new Image();
            img.src = URL.createObjectURL(imageFile);

            img.onload = () => {
                const fabricImage = new fabric.Image(img);

                canvas.add();
                canvas.add(fabricImage);
                canvas.centerObject(fabricImage);
                canvas.setActiveObject(fabricImage);
                canvas.renderAll();
            };
        }
    }, [canvas, imageFile]);

    const handleAddImage = (e) => {
        const file = e.target.files[0];

        if (!file) {
            console.error("No file selected.");
            return;
        }

        setImageFile(file);
        setIsImageAdded(true);
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
        <main className="min-h-screen bg-gradient-to-l from-[#FFA18F] via-[#B14EFF] to-[#3BADFF]">
            <div className="max-w-5xl mx-auto pt-10">
                <header className="flex justify-center py-4 rounded-2xl bg-white/30 backdrop-blur-sm">
                    <div className="flex flex-col gap-5 items-center justify-center">
                        <img src="/logo.svg" alt="logo" className="max-w-40" />
                        <h1 className="font-semibold text-4xl text-white">
                            OG AVATAR BUILDER
                        </h1>
                    </div>
                </header>

                {!isImageAdded && (
                    <div className="max-w-full flex justify-center items-center mt-20">
                        <div>
                            <input
                                className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-100"
                                aria-describedby="file_input_help"
                                id="file_input"
                                type="file"
                                accept="image/*"
                                onChange={handleAddImage}
                            />
                        </div>
                    </div>
                )}

                {isImageAdded && (
                    <div className="p-10 flex justify-center items-center">
                        <canvas ref={canvasRef} className="border-2" />
                        <button onClick={handleClearCanvas}>Clear</button>
                        <button
                            onClick={addGlasses}
                            className="cursor bg-red-400"
                        >
                            Glasses
                        </button>
                        <button
                            onClick={() =>
                                saveCanvasAsImage(
                                    canvas!,
                                    "my_canvas_image.png"
                                )
                            }
                        >
                            Download👓
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
}

export default App;
