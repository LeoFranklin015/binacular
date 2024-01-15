"use client";
import { Connector, useConnect } from "@starknet-react/core";
import React from "react";
import { Button } from "../ui/Button";
import Dialog from "../ui/Dialog";
import { useNavigate } from "react-router-dom";

export default function ConnectModal() {
  const { connect, connectors } = useConnect();
  const navigate = useNavigate()
  // const connectAndNaviagate = () => {

  // }
  console.log(connectors);
  return (
    <Dialog title="Connect Wallet">
      <div className="flex flex-col gap-2">
        {connectors.map((connector: Connector) => {
          return (
            <Button
              key={connector.id}
              onClick={async () => {
                connector.available() ? await connect({ connector }) : null
                navigate("/createprofile")
              }
              }
              disabled={!connector.available()}
              className="flex flex-row items-center justify-start gap-4 w-96 bg-[#97B3B6]"
            >
              {connector.icon.light && (
                <img src={connector.icon.dark} className="w-10 h-10 bg-[#97B3B6]" />
              )}
              <p className="bg-[#97B3B6]">Connect {connector.name}</p>
            </Button>
          );
        })}
      </div>
    </Dialog>
  );
}
