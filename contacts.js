import fs from "fs/promises";
import { nanoid } from "nanoid";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contactsPath = path.join(__dirname, "db/contacts.json");

const listContacts = async () => {
    const data = await fs.readFile(contactsPath);

    return JSON.parse(data);
};

const getContactById = async (id) => {
    const contacts = await listContacts();

    const contact = contacts.find((contact) => contact.id === id);

    return contact || null;
};

const addContact = async (name, email, phone) => {
    const contacts = await listContacts();

    const newContact = {
        id: nanoid(),
        name,
        email,
        phone,
    };

    contacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    return newContact;
};

const removeContact = async (contactId) => {
    const contacts = await listContacts();

    const index = contacts.findIndex((contact) => contact.id === contactId);

    if (index === -1) {
        return null;
    }

    const deletedContact = contacts.splice(index, 1);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    return deletedContact;
};

export { listContacts, getContactById, addContact, removeContact };
