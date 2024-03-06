import { program } from "commander";
import { addContact, getContactById, listContacts, removeContact } from "./contacts.js";

program
    .option("-a, --action <type>", "choose action")
    .option("-i, --id <type>", "user id")
    .option("-n, --name <type>", "user name")
    .option("-e, --email <type>", "user email")
    .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case "list":
            const allContacts = await listContacts();
            console.table(allContacts);
            break;

        case "get":
            const contact = await getContactById(id);
            console.table(contact);
            break;

        case "add":
            const newContact = await addContact(name, email, phone);
            console.table(newContact);
            break;

        case "remove":
            const deletedContact = await removeContact(id);
            console.table(deletedContact);
            break;

        default:
            console.warn("\x1B[31m Unknown action type!");
    }
}

invokeAction(options);
