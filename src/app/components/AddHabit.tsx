"use client";

import { useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "./Modal";
import { Plus, XSquare } from "lucide-react";
import { Input } from "./ui/input";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Toggle } from "./ui/toggle";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function AddHabit() {
  const [showModal, setShowModal] = useState(false);

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
          <div className="bg-white rounded shadow-lg w-1/3">
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
                  <span className="text-lg">2. Type</span>
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
                  <span className="text-lg">3. Frequency</span>
                  <div className="flex space-x-2">
                    {days.map((day) => (
                      <Toggle className="flex-1" variant="outline" key={day}>
                        {day}
                      </Toggle>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <Toggle className="flex-1" variant="outline">
                      Week Days
                    </Toggle>
                    <Toggle className="flex-1" variant="outline">
                      Every Day
                    </Toggle>
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <div className="flex items-center space-x-2 py-4 px-10">
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
