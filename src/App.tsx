import "./index.css";
import { useRef, useState, useEffect } from "react";
import * as fabric from "fabric";
import toast, { Toaster } from "react-hot-toast";
import { Download, Eraser } from "lucide-react";

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

    const addAsset = (imageUrl: string, assetName: string) => {
        const imageElement = new Image();
        imageElement.src = imageUrl;

        imageElement.onload = () => {
            const fabricImage = new fabric.Image(imageElement);

            if (canvas) {
                toast.success(`${assetName} added`);
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
            toast.error("Something went wrong");
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
        toast.success("Image downloaded successfully");
    };

    const handleClearCanvas = () => {
        if (canvas) {
            canvas.clear();
        }
    };

    return (
        <main className="min-h-screen bg-gradient-to-l from-[#FFA18F] via-[#B14EFF] to-[#3BADFF]">
            <Toaster position="top-right" />
            <div className="max-w-5xl mx-auto pt-10">
                <header className="flex justify-center py-4 rounded-2xl bg-white/30 backdrop-blur-sm">
                    <div className="flex flex-col items-center justify-center">
                        <img src="/logo.svg" alt="logo" className="max-w-40" />
                        <h1 className="font-semibold text-4xl text-white pt-4">
                            OG AVATAR BUILDER
                        </h1>
                        <p className="pt-4 text-sm text-white/80">
                            by{" "}
                            <a
                                href="https://x.com/prmakk"
                                className="underline"
                            >
                                prmakk
                            </a>
                        </p>
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
                    <div className="p-10 flex justify-between gap-6">
                        <div className="flex flex-col flex-1/2 gap-4 justify-center items-center">
                            <canvas
                                ref={canvasRef}
                                className="border-dashed border-1 border-amber-50 rounded-2xl"
                            />

                            <div className="flex justify-around w-full">
                                <button
                                    onClick={() =>
                                        saveCanvasAsImage(
                                            canvas!,
                                            "my_canvas_image.png"
                                        )
                                    }
                                    className="flex gap-1 items-center bg-white px-6 py-2 rounded-2xl hover:bg-purple hover:text-white cursor-pointer transition-all"
                                >
                                    Download
                                    <Download size={20} />
                                </button>
                                <button
                                    onClick={handleClearCanvas}
                                    className="flex gap-1 items-center bg-white px-6 py-2 rounded-2xl hover:bg-purple hover:text-white cursor-pointer transition-all"
                                >
                                    Clear
                                    <Eraser size={20} />
                                </button>
                            </div>
                        </div>

                        <div className="flex-1/2">
                            <h2 className="text-center text-2xl font-bold text-white pb-2">
                                Assets
                            </h2>

                            <div className="flex flex-wrap gap-4">
                                <button
                                    onClick={() =>
                                        addAsset("0g_glasses.png", "Glasses")
                                    }
                                    className="cursor-pointer hover:bg-purple-300 transition-all bg-white p-3 rounded-2xl aspect-square flex flex-col justify-around"
                                >
                                    <img
                                        src="/0g_glasses.png"
                                        alt="glasses"
                                        className="max-w-25"
                                    />
                                </button>
                                <button
                                    onClick={() =>
                                        addAsset(
                                            "0G_gradient_logo.png",
                                            "Gradient logo"
                                        )
                                    }
                                    className="cursor-pointer hover:bg-purple-300 transition-all bg-white p-3 rounded-2xl aspect-square flex flex-col justify-around"
                                >
                                    <img
                                        src="/0G_gradient_logo.png"
                                        alt="logo"
                                        className="max-w-25"
                                    />
                                </button>
                                <button
                                    onClick={() =>
                                        addAsset("0g-Panda.png", "Panda")
                                    }
                                    className="cursor-pointer hover:bg-purple-300 transition-all bg-white p-3 rounded-2xl aspect-square flex flex-col justify-around"
                                >
                                    <img
                                        src="/0g-Panda.png"
                                        alt="logo"
                                        className="max-w-25"
                                    />
                                </button>
                                <button
                                    onClick={() =>
                                        addAsset(
                                            "panda_flying.png",
                                            "Flying panda"
                                        )
                                    }
                                    className="cursor-pointer hover:bg-purple-300 transition-all bg-white p-3 rounded-2xl aspect-square flex flex-col justify-around"
                                >
                                    <img
                                        src="/panda_flying.png"
                                        alt="panda"
                                        className="max-w-25"
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}

export default App;
