import { describe, it, expect, beforeEach } from "vitest";
import {
    render,
    screen,
    within,
    waitFor,
    fireEvent,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Твои компоненты
import App from "./App";

describe("Добавление и удаление элемента формы", () => {
    let user: ReturnType<typeof userEvent.setup>;

    beforeEach(() => {
        user = userEvent.setup();
    });

    const renderComponent = () => {
        return render(<App />);
    };

    it("выполняем полный процесс добавления, редактирования свойств (как общих, так и персонлаьных) и удаления поля формы", async () => {
        // 1. Рендерим приложение
        const { container } = renderComponent();

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

        // 3. Добавялем инпут в форму
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

        // 4. редактируем инпут
        await user.click(editButton);

        await waitFor(() => {
            expect(screen.getByTestId("editor")).toBeInTheDocument();
        });

        const borderInput = screen.getByLabelText(/Толщина рамки/);
        expect(borderInput).toBeInTheDocument();

        await user.click(borderInput);
        await user.clear(borderInput);
        await user.type(borderInput, "6");
        await user.tab();

        // 5. Делаем инпут заблокированным
        const blockCheckbox = screen.getByLabelText(/Заблокировано/);
        await user.click(blockCheckbox);

        const input = formElement.querySelector("input") as HTMLElement;
        expect(input).toHaveStyle("border-width: 6px");
        expect(input).toBeDisabled();

        // 6. удаляем инпут

        const deleteButton = within(formElement).getByRole("button", {
            name: "delete",
        });
        await user.click(deleteButton);
        expect(screen.queryByTestId("field-1")).toBeNull();
    });

    it("добавление элемента с помощью drag'n'drop", async () => {
        const { container } = renderComponent();

        const testInput = screen.getByTestId("p--1");
        const creationRow = screen.getByTestId("creation");
        const cont = screen.getByTestId("container");

        expect(cont).toBeInTheDocument();
        expect(creationRow).toBeInTheDocument();

        await waitFor(() => {
            fireEvent.dragStart(testInput);
            fireEvent.dragEnter(cont);
            fireEvent.dragOver(cont);
            fireEvent.drop(cont);
        });

        
    });
});
