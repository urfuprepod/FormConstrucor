// src/app/App.test.tsx
import { describe, it, expect, beforeEach } from "vitest"; // Импорты из vitest!
import React from "react";
import { render, screen, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Твои компоненты
import App from "./App";

describe("Three Blocks Flow", () => {
    let user: ReturnType<typeof userEvent.setup>;

    beforeEach(() => {
        user = userEvent.setup();
    });

    it("should complete full flow: add clone → edit → save", async () => {
        // 1. Рендерим приложение
        render(<App />);

        // 2. Проверяем начальное состояние

        const testInput = screen.getByTestId("p--1");
        const testSelect = screen.getByTestId("p--2");

        expect(testInput).toBeInTheDocument();
        expect(testSelect).toBeInTheDocument();

        const addInputButton = within(testInput).getByRole("button", {
            name: "push",
        });
        const addSelectButton = within(testSelect).getByRole("button", {
            name: "push",
        });

        expect(addInputButton).toBeInTheDocument();
        expect(addSelectButton).toBeInTheDocument();

        await user.click(addInputButton);

        await waitFor(() => {
            const formElement = screen.getByTestId("field-1");
            expect(formElement).toBeInTheDocument();
        });

        const formElement = screen.getByTestId("field-1");
        const editButton = within(formElement).getByRole("button", {
            name: "edit",
        });

        expect(editButton).toBeInTheDocument();

        await user.click(editButton);

        await waitFor(() => {
            expect(screen.getByTestId("editor")).toBeInTheDocument();
        });

        const borderInput = screen.getByLabelText("Толщина рамки");
        expect(borderInput).toBeInTheDocument();

        await user.click(borderInput);
        await user.clear(borderInput);
        await user.type(borderInput, "6");
        await user.tab();

        const blockCheckbox = screen.getByLabelText('Заблокировано');
        await user.click(blockCheckbox);

        const input = formElement.querySelector("input") as HTMLElement;
        expect(input).toHaveStyle("border-width: 6px")
        expect(input).toBeDisabled();
    });
});
