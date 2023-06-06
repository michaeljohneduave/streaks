"use client";

import { useState } from "react";
import { Modal, ModalBody } from "./Modal";
import { BedDouble } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const hours = Array.from(Array(12).keys())
  .map((hour) => hour + 1)
  .map((hour) => hour.toString().padStart(2, "0"));
const minutes = Array.from(Array(60).keys()).map((minute) =>
  minute.toString().padStart(2, "0")
);

export default function Bedtime() {
  const [showModal, setShowModal] = useState(false);
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");

  function showBedtimeModal() {
    setShowModal(true);
  }

  return (
    <>
      <button onClick={showBedtimeModal}>
        <div className="text-2xl text-gray-400 cursor-pointer hover:text-black">
          Add your bedtime here.
        </div>
      </button>
      {showModal ? (
        <Modal>
          <div className="bg-white rounded shadow-lg w-5/12">
            <ModalBody>
              <div className="p-10 space-y-5">
                <div className="flex items-center space-x-10">
                  <div className="grow-0">
                    <BedDouble size="80px" />
                  </div>
                  <div className="grow-1">
                    <span className="text-4xl">When do you usually sleep?</span>
                  </div>
                </div>
                <div className="flex space-x-5 justify-center items-center">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">HH:</span>
                    <Input
                      type="number"
                      className="h-15 text-5xl"
                      placeholder="00"
                      min="0"
                      max="12"
                      onChange={(e) => setHours(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">MM:</span>
                    <Input
                      type="number"
                      className="h-15 text-5xl"
                      placeholder="00"
                      min="0"
                      max="59"
                      onChange={(e) => setMinutes(e.target.value)}
                    />
                  </div>
                  <div className="flex">
                    <Tabs className="h-full" defaultValue="PM">
                      <TabsList className="flex rounded-full w-full h-full">
                        <TabsTrigger
                          className="rounded-full m-1 text-lg"
                          value="AM"
                        >
                          AM
                        </TabsTrigger>
                        <TabsTrigger
                          className="rounded-full m-1 text-lg"
                          value="PM"
                        >
                          PM
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </div>
                <div className="flex space-x-5 justify-center">
                  <Button className="rounded-lg w-1/3">Add Bedtime</Button>
                  <Button
                    className="rounded-mg w-1/3"
                    variant={"secondary"}
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </ModalBody>
          </div>
        </Modal>
      ) : null}
    </>
  );
}
