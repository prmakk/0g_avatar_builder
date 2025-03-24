import React, { FC } from "react";

interface IProps {
    addAsset: (image: string, title: string) => void;
}

const Assets: FC<IProps> = ({ addAsset }) => {
    return (
        <div className="flex-1/2">
            <h2 className="text-center text-2xl font-bold text-white pb-2">
                Assets
            </h2>

            <div className="flex flex-wrap gap-4">
                <button
                    onClick={() => addAsset("0g_glasses.png", "Glasses")}
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
                        addAsset("0G_gradient_logo.png", "Gradient logo")
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
                    onClick={() => addAsset("0g-Panda.png", "Panda")}
                    className="cursor-pointer hover:bg-purple-300 transition-all bg-white p-3 rounded-2xl aspect-square flex flex-col justify-around"
                >
                    <img src="/0g-Panda.png" alt="logo" className="max-w-25" />
                </button>
                <button
                    onClick={() => addAsset("panda_flying.png", "Flying panda")}
                    className="cursor-pointer hover:bg-purple-300 transition-all bg-white p-3 rounded-2xl aspect-square flex flex-col justify-around"
                >
                    <img
                        src="/panda_flying.png"
                        alt="panda"
                        className="max-w-25"
                    />
                </button>
                <button
                    onClick={() => addAsset("0g_sticker_1.png", "0G sticker")}
                    className="cursor-pointer hover:bg-purple-300 transition-all bg-white p-3 rounded-2xl aspect-square flex flex-col justify-around"
                >
                    <img
                        src="/0g_sticker_1.png"
                        alt="sticker"
                        className="max-w-25"
                    />
                </button>
                <button
                    onClick={() => addAsset("0g_sticker_2.png", "0G sticker")}
                    className="cursor-pointer hover:bg-purple-300 transition-all bg-white p-3 rounded-2xl aspect-square flex flex-col justify-around"
                >
                    <img
                        src="/0g_sticker_2.png"
                        alt="sticker"
                        className="max-w-25"
                    />
                </button>
                <button
                    onClick={() => addAsset("0g_sticker_3.png", "0G sticker")}
                    className="cursor-pointer hover:bg-purple-300 transition-all bg-white p-3 rounded-2xl aspect-square flex flex-col justify-around"
                >
                    <img
                        src="/0g_sticker_3.png"
                        alt="sticker"
                        className="max-w-25"
                    />
                </button>
                <button
                    onClick={() => addAsset("0g_sticker_4.png", "0G sticker")}
                    className="cursor-pointer hover:bg-purple-300 transition-all bg-white p-3 rounded-2xl aspect-square flex flex-col justify-around"
                >
                    <img
                        src="/0g_sticker_4.png"
                        alt="sticker"
                        className="max-w-25"
                    />
                </button>
                <button
                    onClick={() => addAsset("0g_sticker_5.png", "0G sticker")}
                    className="cursor-pointer hover:bg-purple-300 transition-all bg-white p-3 rounded-2xl aspect-square flex flex-col justify-around"
                >
                    <img
                        src="/0g_sticker_5.png"
                        alt="sticker"
                        className="max-w-25"
                    />
                </button>
            </div>
        </div>
    );
};

export default Assets;
