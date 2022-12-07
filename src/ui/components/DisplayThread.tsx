/* eslint-disable */
import React, { useState, useEffect, useCallback } from "react";
import {
  Button,
  ButtonToolbar,
  Divider,
  Message,
  Modal,
  Placeholder,
  Tooltip,
  Whisper,
} from "rsuite";
import { IQuestionItem } from "../../core/interfaces";
import ReactMarkdown from "react-markdown";
//@ts-ignore
import remarkGfm from "remark-gfm";

import ResizeIcon from "@rsuite/icons/Resize";
import { useQRCode } from "next-qrcode";
import { ethers } from "ethers";
interface IDisplayThreadProps {
  open: boolean;
  onClose: (() => void) | undefined;
  data: IQuestionItem | undefined;
}
const { Paragraph } = Placeholder;

const tooltip = (
  <Tooltip>
    Click here to open the question on the stack overflow website.
  </Tooltip>
);

const generateAddress = () => {
  const randomAddress = ethers.Wallet.createRandom().address;
  return randomAddress;
};

const DisplayThread: React.FC<IDisplayThreadProps> = React.memo(
  ({ open = false, onClose = undefined, data = undefined }) => {
    const handleClose = () => {
      if (onClose) onClose();
    };

    const getRandomNumber = useCallback(() => {
      return Math.floor(Math.random() * 1000);
    }, []);

    const { Canvas } = useQRCode();
    const [address, setAddress] = useState<string>(generateAddress());

    return (
      <div className="modal-container">
        <Modal full open={open} onClose={handleClose}>
          <Modal.Header>
            <Modal.Title className="mb-0">
              <Whisper
                placement="bottomStart"
                controlId="control-id-hover"
                trigger="hover"
                speaker={tooltip}
              >
                <span
                  className="text-xl font-semibold text-gray-900 cursor-pointer hover:opacity-70 hover:underline flex flex-row justify-start items-center"
                  onClick={() => {
                    window.open(data?.link);
                  }}
                >
                  <ResizeIcon className="mr-2" />
                  {data?.title}
                </span>
              </Whisper>

              <div className="flex flex-row justify-start items-center mt-2">
                <span className="text-xs">{`Question ID: ${data?.question_id} | View count: ${data?.view_count} | Up vote count: ${data?.up_vote_count}`}</span>
                &nbsp;
                <br />
                {open && (
                  <span className={`text-xs font-semibold ${"text-green-600"}`}>
                    Reputation score : {getRandomNumber()}
                  </span>
                )}
              </div>
            </Modal.Title>
          </Modal.Header>
          <Divider />
          <Modal.Body>
            <div className="w-fit my-4 flex flex-col justify-start items-center border border-solid border-gray-100 rounded-md shadow-lg py-4 px-4 ">
              <div className="my-4 text-base font-semibold text-gray-900">
                Scan me and send RAC token to this address.
              </div>

              <Canvas
                text={address}
                options={{
                  level: "H",
                  margin: 3,
                  scale: 4,
                  width: 256,
                  color: {
                    dark: "#010599FF",
                    light: "#FFBF60FF",
                  },
                  quality: 1,
                }}
              />
              <div className="my-4 text-base font-semibold text-gray-900">
                {address}
              </div>
            </div>
            {!data?.body_markdown && <Paragraph rows={8} />}
            {data?.body_markdown && (
              <ReactMarkdown
                children={data?.body_markdown}
                remarkPlugins={[remarkGfm]}
              />
            )}
          </Modal.Body>
          <Modal.Footer className="mx-6 my-2">
            <Button onClick={handleClose} className="w-24" appearance="primary">
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
);

export { DisplayThread };

const styles = {};
