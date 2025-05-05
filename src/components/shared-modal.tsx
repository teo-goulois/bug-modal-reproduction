"use client";

import { useDisclosure } from "@/hooks/use-disclosure";
import { Button } from "./ui/button";
import { Modal } from "./ui/modal";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export const SharedModal = () => {
  const { isOpen, onOpenChange, onClose } = useDisclosure();
  const pathname = usePathname();

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <Button>Open Modal</Button>
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>{`Bug reproduction (state:${
              isOpen ? "open" : "closed"
            })`}</Modal.Title>
            <Modal.Description>
              This is a bug reproduction for a modal that is not closing when
              the link is clicked.
            </Modal.Description>
          </Modal.Header>
          <Modal.Body>
            <Link href="/">Home</Link>
            <Link href="/page-1">Page 1</Link>
            <Link href="/page-2">Page 2</Link>
          </Modal.Body>
          <Modal.Footer>
            <Modal.Close>Close</Modal.Close>
            <Button>Confirm</Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};
