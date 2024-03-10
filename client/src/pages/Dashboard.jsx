import ProgressBar from "@/components/ProgressBar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { authStore } from "@/store/auth";
import React, { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CreatePoll from "@/components/CreatePoll";
import { PlusIcon } from "@radix-ui/react-icons";
import Polls from "@/components/Polls";

const Dashbaord = () => {
  const logout = authStore((state) => state.logout);
  const getUser = authStore((state) => state.getUser);
  const user = authStore((state) => state.user);
  const token = authStore((state) => state.token);

  useEffect(() => {
    getUser(token);
  }, [getUser]);
  console.log(user);
  return (
    <div>
      <div className="sticky top-0 z-50 flex items-center justify-between px-16 py-4 bg-white border-b">
        <div>
          <h2 className="text-3xl font-semibold">Pollit.</h2>
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage
                  src={`https://api.dicebear.com/7.x/lorelei/svg?seed=${user?.email}`}
                />
                <AvatarFallback>
                  {user?.name[0].toUpperCase() + user?.name[1].toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="max-w-2xl py-4 mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-semibold">Polls</h2>
          </div>
          <CreatePoll
            trigger={
              <Button>
                <PlusIcon className="w-4 h-4 mr-2" />
                Create Poll
              </Button>
            }
          />
        </div>
        <div>
          <Polls />
        </div>
      </div>
    </div>
  );
};

export default Dashbaord;
