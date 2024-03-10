import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
  CardFooter,
} from "./ui/card";
import { Button } from "./ui/button";
import { CheckCircledIcon, CircleIcon } from "@radix-ui/react-icons";

const Poll = ({ poll }) => {
  const [selected, setSelected] = useState("");
  const formatDate = (date) => {
    const d = new Date(date);
    return d.toDateString();
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{poll?.title}</span>
          <span className="text-xs font-medium text-gray-600">
            {formatDate(poll?.createdAt)}
          </span>
        </CardTitle>
        <CardDescription>{poll?.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {poll?.options.map((option, index) => {
          return (
            <div
              key={index}
              onClick={() => setSelected(option?.id)}
              className={`flex items-center gap-2 p-4 rounded-md cursor-pointer ${
                selected === option?.id ? "bg-gray-100 " : "text-black"
              }`}
            >
              <div
                className={`p-1 flex items-center justify-center rounded-full`}
              >
                {selected !== option?.id && (
                  <CircleIcon className="w-4 h-4 text-primary" />
                )}
                {selected === option?.id && (
                  <CheckCircledIcon className="w-4 h-4 text-primary" />
                )}
              </div>
              <h2 className="font-semibold">{option.text}</h2>
            </div>
          );
        })}
      </CardContent>
      <CardFooter>
        <Button className="w-full">Vote</Button>
      </CardFooter>
    </Card>
  );
};

export default Poll;
