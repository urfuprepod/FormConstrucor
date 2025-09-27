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

        // // 4. Нажимаем на кнопку + у первого элемента
        await user.click(addInputButton);

        // // 5. Проверяем, что клон появился в блоке 2
        await waitFor(() => {
            const formElement = screen.getByTestId("field-1");
            expect(formElement).toBeInTheDocument();
        });

        // // 6. Находим кнопку "ред" у клонированного элемента
        const formElement = screen.getByTestId("field-1");
        const editButton = within(formElement).getByRole("button", {
            name: "edit",
        });

        expect(editButton).toBeInTheDocument();

        // // 7. Нажимаем на кнопку "ред"
        // await user.click(editButton)

        // // 8. Проверяем, что открылся блок 3 с формой редактирования
        // await waitFor(() => {
        //   expect(screen.getByTestId('block-3')).toBeInTheDocument()
        // })

        // // 9. Проверяем, что в блоке 3 отображается правильный элемент
        // expect(screen.getByText('Редактирование: Элемент 1')).toBeInTheDocument()

        // // 10. Находим поле ввода и меняем значение
        // const editInput = screen.getByTestId('edit-input')
        // expect(editInput).toHaveValue('Элемент 1')

        // // 11. Редактируем текст
        // await user.clear(editInput)
        // await user.type(editInput, 'Отредактированный элемент')

        // // 12. Нажимаем кнопку Сохранить
        // const saveButton = screen.getByTestId('save-btn')
        // await user.click(saveButton)

        // // 13. Проверяем, что блок 3 закрылся
        // await waitFor(() => {
        //   expect(screen.queryByTestId('block-3')).toBeNull()
        // })

        // // 14. Проверяем, что элемент в блоке 2 обновился
        // expect(clonedElement).toHaveTextContent('Отредактированный элемент')
        // expect(clonedElement).not.toHaveTextContent('Элемент 1')
    });
});
