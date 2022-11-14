import React from 'react'

export const Modal = ({ OnConfirm, show, OnClose, children,title }) => {

    return (
        show &&
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50">
                <div className="relative w-auto my-6 mx-auto max-w-[30rem]">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-slate-900 px-10">
                        <div className="flex items-start justify-between p-5">
                            <h3 className="text-3xl font-semibold text-white">
                                {title}
                            </h3>
                        </div>
                        {children}
                        
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}
