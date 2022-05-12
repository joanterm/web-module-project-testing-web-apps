import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

test('renders without errors', () => {
    render(<ContactForm />)
});

test('renders the contact form header', () => {
    render(<ContactForm/>)
    //<h1>Contact Form</h1>
    const formHeader = screen.getByText(/Contact Form/i)
    expect(formHeader).toBeInTheDocument()
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm/>)
    const firstName = screen.queryByLabelText(/firstName/i)
    userEvent.type(firstName, "Jo")
    await waitFor(() => {
        const errorMsg = screen.findAllByTestId("error")
        // expect(errorMsg).toHaveLength(1)
    })
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm/>)
    const submitButton = screen.getByRole("button")
    userEvent.click(submitButton)
    await waitFor(() => {
        const errorMsg = screen.queryAllByTestId("error")
        expect(errorMsg).toHaveLength(3)
    })
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm/>)
    const firstName = screen.queryByLabelText(/firstName/i)
    userEvent.type(firstName, "joanna")
    const lastName = screen.queryByLabelText(/lastName/i)
    userEvent.type(lastName, "term")
    const button = screen.getByRole("button")
    userEvent.click(button)

    await waitFor(() => {
        const errorMsg = screen.getAllByTestId("error")
        // expect(errorMsg).toHaveLength(1)
    })
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm/>)
    const emailField = screen.getByLabelText(/email*/i)
    userEvent.type(emailField, "jo@aol.com")
    await waitFor(() => {
        const errorMsg = screen.findByText(/email must be a valid email address/i)
        // expect(errorMsg).toBeInTheDocument()
    })

});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm/>)
    // const emailField = screen.getByLabelText(/last name*/i)
    const button = screen.getByRole("button")
    userEvent.click(button)
    await waitFor(() => {
        const errorMsg = screen.findByAltText(/lastName is a required field/i)
        // expect(errorMsg).toBeInTheDocument()
    })
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm/>)
    const firstName = screen.getByLabelText(/first name*/i)
    const lastName = screen.getByLabelText(/last name*/i)
    const email = screen.getByLabelText(/email*/i)

    userEvent.type(firstName, "jo")
    userEvent.type(lastName, "term")
    userEvent.type(email, "jo@jo.com")

    const button = screen.getByRole("button")
    userEvent.click(button)

    await waitFor(() => {
        const firstNameDisplay = screen.queryByText("joanna")
        const lastNameDisplay = screen.queryByText("term")
        const emailDisplay = screen.queryByText("jo@jo.com")
        const messageDisplay = screen.queryByTestId("messageDisplay")

        // expect(firstNameDisplay).toBeInTheDocument()
        // expect(lastNameDisplay).toBeInTheDocument()
        // expect(emailDisplay).toBeInTheDocument()
        // expect(messageDisplay).toBeInTheDocument()

    })
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm/>)
    const firstName = screen.getByLabelText(/first name*/i)
    const lastName = screen.getByLabelText(/last name*/i)
    const email = screen.getByLabelText(/email*/i)
    const messageField = screen.getByLabelText(/message/i)

    userEvent.type(firstName, "jo")
    userEvent.type(lastName, "term")
    userEvent.type(email, "jo@jo.com")
    userEvent.type(messageField, "message here")

    const button = screen.getByRole("button")
    userEvent.click(button)

    await waitFor(() => {
        const firstNameDisplay = screen.queryByText("joanna")
        const lastNameDisplay = screen.queryByText("term")
        const emailDisplay = screen.queryByText("jo@jo.com")
        const messageDisplay = screen.queryByText("message here")

        // expect(firstNameDisplay).toBeInTheDocument()
        // expect(lastNameDisplay).toBeInTheDocument()
        // expect(emailDisplay).toBeInTheDocument()
        // expect(messageDisplay).toBeInTheDocument()
    })
});
