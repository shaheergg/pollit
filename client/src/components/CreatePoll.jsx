import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import { ScrollArea } from "./ui/scroll-area";
import { authStore } from "@/store/auth";
import { usePollStore } from "@/store/poll";
import { toast } from "sonner";
const CreatePoll = ({ trigger }) => {
  const [options, setOptions] = useState([{ text: "" }, { text: "" }]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const token = authStore((state) => state.token);
  const createPoll = usePollStore((state) => state.createPoll);
  const [loading, setLoading] = useState(false);
  const submitForm = async (e) => {
    e.preventDefault();
    if (!title) {
      toast("Please enter title", {
        type: "error",
      });
      return;
    }
    if (!options.length > 2) {
      toast("There should be atleast two options", {
        type: "error",
      });
      return;
    }
    setLoading(true);
    const poll = {
      title,
      description,
      options,
    };
    try {
      await createPoll(token, poll);
      toast("Poll Created Successfully", {
        type: "success",
      });
    } catch (error) {
      toast("Error:" + error.message, {
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };
  const handleOptionChange = (index) => (e) => {
    const newOptions = [...options];
    newOptions[index].text = e.target.value;
    setOptions(newOptions);
  };
  const addNewOption = () => {
    setOptions([...options, { text: "" }]);
  };
  const deleteOption = (index) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };
  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader className={"space-y-4"}>
          <DialogTitle>Create Poll</DialogTitle>
          <DialogDescription className={"space-y-4"}>
            <Label htmlFor={"poll-title"}>Poll Title</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              id="poll-title"
              label="Poll Title"
              placeholder="Enter your poll title"
            />
            <div className="space-y-4">
              <Label htmlFor={"poll-description"}>Poll Description</Label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                id="poll-description"
                placeholder="Enter your poll description"
              />
            </div>
          </DialogDescription>
        </DialogHeader>
        <div className="w-full">
          <div className="flex items-center justify-between">
            <h2 className="py-2 text-lg font-semibold text-primary">Options</h2>
            <Button onClick={addNewOption} variant="outline" size={"icon"}>
              <PlusIcon className="w-5 h-5" />
            </Button>
          </div>
          <ScrollArea className="space-y-4 h-[150px] w-full">
            <div className="px-1 py-4 space-y-4">
              {options.map((option, index) => (
                <div key={index} className="flex items-center gap-4">
                  <Input
                    onChange={handleOptionChange(index)}
                    key={index}
                    value={option.text}
                    label={`Option ${index + 1}`}
                    placeholder={`Enter option ${index + 1}`}
                  />
                  <Button
                    onClick={() => deleteOption(index)}
                    size="icon"
                    variant="outline"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="flex items-center justify-end py-2"></div>
        </div>

        <DialogFooter className={"w-full"}>
          <DialogClose asChild className="w-full">
            <Button onClick={submitForm} disabled={loading} className="w-full">
              {loading ? "Loading..." : "Create Poll"}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePoll;
