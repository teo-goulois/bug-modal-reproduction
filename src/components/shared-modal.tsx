"use client";

import { useDisclosure } from "@/hooks/use-disclosure";
import { Button } from "./ui/button";
import { Modal } from "./ui/modal";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { SearchField } from "./ui/search-field";

export const SharedModal = () => {
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure({
    onClose: () => {
      console.log(
        "[NavbarSearchModal] useDisclosure onClose callback triggered"
      );
      setQuery("");
    },
    onOpen() {
      console.log(
        "[NavbarSearchModal] useDisclosure onOpen callback triggered"
      );
    },
    onChange(open) {
      console.log(
        `[NavbarSearchModal] useDisclosure onChange callback triggered, isOpen: ${open}`
      );
    },
  });
  const [query, setQuery] = useState("");

  const pathname = usePathname();

  useEffect(() => {
    onClose();
  }, [pathname]);

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        {/* <Button>Open Modal</Button> */}
        <button className="w-full max-w-lg" onClick={onOpen}>
          <SearchField
            placeholder="Search"
            isReadOnly={true}
            className="m-auto w-full max-w-lg"
            aria-label="Rechercher un produit"
            value={query}
            onChange={(value) => setQuery(value)}
          />
        </button>
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
            <Button onPress={onClose}>Confirm</Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};
