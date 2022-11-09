import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { Fragment, useState } from "react";

const ModalDialog = ({ open, important, sendModalState, children, task }) => {
  return (
    <>
      <div
        className={`fixed inset-0 ${
          open ? "opacity-100" : "opacity-0"
        } pointer-events-none items-center justify-center bg-gray-900/50 transition-all duration-300`}
      />
      <Transition appear show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => sendModalState(null)}
        >
          <div className="text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay
                className={`${
                  important && "pointer-events-none"
                } fixed inset-0`}
              />
            </Transition.Child>

            <span className="inline-block h-screen align-middle">&#8203;</span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 translate-y-full"
              enterTo="opacity-100 translate-y-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-full"
            >
              <div className="inline-block h-fit w-full max-w-xs transform overflow-hidden rounded-md bg-gray-100 px-8 py-4 align-middle transition-all">
                {children}
                {task}
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ModalDialog;
