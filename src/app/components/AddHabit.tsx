"use client";

import { use, useEffect, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "./Modal";
import { Plus, XSquare } from "lucide-react";
import { Input } from "./ui/input";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Toggle } from "./ui/toggle";
import { Textarea } from "./ui/textarea";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;
type Day = (typeof DAYS)[number];

export default function AddHabit() {
  const [showModal, setShowModal] = useState(false);
  const [days, setDays] = useState<string[]>([]);
  const [multi, setMulti] = useState<"everyday" | "weekdays" | null>(null);

  useEffect(() => {
    if (days.length === DAYS.length) {
      setMulti("everyday");
    } else if (
      days.length === 5 &&
      days.filter((d) => d !== "Sat" && d !== "Sun").length === 5
    ) {
      setMulti("weekdays");
    } else {
      setMulti(null);
    }
  }, [days.length]);

  useEffect(() => {
    if (!showModal) {
      setDays([]);
    }
  }, [showModal]);

  const handleMultiPress = (
    isPressed: boolean,
    type: "everyday" | "weekdays"
  ) => {
    if (!isPressed) {
      setDays([]);
    } else if (type === "everyday") {
      setDays([...DAYS]);
    } else if (type === "weekdays") {
      setDays([...DAYS.filter((d) => d !== "Sat" && d !== "Sun")]);
    }
  };

  const handleDayPress = (isPressed: boolean, day: Day) => {
    if (isPressed) {
      setDays([...days, day]);
    } else {
      setDays([...days.filter((d) => d !== day)]);
    }
  };

  return (
    <div className="w-full flex">
      <Button
        className="h-full ml-auto rounded-full hover:bg-primary-foreground"
        variant="outline"
        onClick={() => setShowModal(true)}
      >
        <Plus className="mr-2" /> Add Habit
      </Button>
      {showModal ? (
        <Modal>
          <div className="bg-white rounded-2xl shadow-lg w-1/3">
            <ModalHeader>
              <div className="flex items-center px-10 py-4">
                <span>Add Habit</span>
                <span
                  className="ml-auto cursor-pointer"
                  onClick={() => setShowModal(false)}
                >
                  <XSquare />
                </span>
              </div>
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-col p-10 space-y-10">
                <div className="space-y-3">
                  <span className="text-lg">1. Name</span>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Name this habit"
                    required
                  />
                </div>
                <div className="space-y-3">
                  <span className="text-lg">2. Details</span>
                  <Textarea name="details" placeholder="Add habit details" />
                </div>
                <div className="space-y-3">
                  <span className="text-lg">3. Type</span>
                  <RadioGroup className="flex" defaultValue="todo">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="todo" id="todo" />
                      <Label htmlFor="i1">To-Do</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="avoid" id="avoid" />
                      <Label htmlFor="i2">Avoid</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="space-y-3">
                  <span className="text-lg">4. Frequency</span>
                  <div className="flex space-x-2">
                    {DAYS.map((day) => (
                      <Toggle
                        className="flex-1"
                        variant="outline"
                        key={day}
                        pressed={days.includes(day)}
                        onPressedChange={(isPressed) =>
                          handleDayPress(isPressed, day)
                        }
                      >
                        {day}
                      </Toggle>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <Toggle
                      className="flex-1"
                      variant="outline"
                      onPressedChange={(isPressed) =>
                        handleMultiPress(isPressed, "weekdays")
                      }
                      pressed={multi === "weekdays"}
                    >
                      Week Days
                    </Toggle>
                    <Toggle
                      className="flex-1"
                      variant="outline"
                      onPressedChange={(isPressed) =>
                        handleMultiPress(isPressed, "everyday")
                      }
                      pressed={multi === "everyday"}
                    >
                      Every Day
                    </Toggle>
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <div className="flex items-center space-x-10 py-4 px-10">
                <Button className="flex-1" variant="default">
                  Add
                </Button>
                <Button
                  className="flex-1"
                  variant="outline"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </Button>
              </div>
            </ModalFooter>
          </div>
        </Modal>
      ) : null}
    </div>
  );
}
