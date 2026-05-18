/* NOTE:
    Talk info = Pep talk title, description, and image
    Attendees = Creator, co-hosts, and invitees
    Hosts = Creator and co-hosts
*/

/* OBJECT DEFINITIONS */
// NOTE: Maybe move to own file?
class Role {
    static CREATOR = "creator";
    static CO_HOST = "co-host";
    static INVITEE = "invitee";

    static is_valid(role) {
        return [Role.CREATOR, Role.CO_HOST, Role.INVITEE].includes(role);
    }
}
/**
 * @typedef {Object} Attendee
 * @property {string} first_name
 * @property {string} last_name
 * @property {string} email
 * @property {Role} role
 */


/* LOAD DATA */
/**
 * @returns {Object<string>} An object containing the talk title, description, and image
 */
const get_talk_info = () => {
    // TODO: Get talk title and description
    //  1. Call backend
    
    return {
        "title": null,
        "descr": null,
        "img": null
    };
}

/**
 * @returns {string[]} List of all co-host names
 */
const get_co_hosts = () => {
    // TODO: Get co-host names
    //  1. Call backend

    return [];
}

/**
 * @returns {Attendee[]} List of all attendees (including host and co-hosts)
 */
const get_all_attendees = () => {
    // TODO: Get attendee names
    //  1. Call backend
    //  2. Turn to class objects

    return [];
}

/* DISPLAY DATA */
/**
 * Fill the talk form inputs and image with pre-existing info, if it exists
 */
const fill_talk_form = (title_inpt, descr_inpt, img) => {
    const talk_info = get_talk_info();

    if(talk_info["title"] != null) {
        title_inpt.value = talk_info["title"];
    }
    if(talk_info["descr"] != null) {
        descr_inpt.value = talk_info["descr"];
    }
    if(talk_info["img"] != null) {
        img.setAttribute("src", talk_info["img"]);
    }
}

/**
 * Fill the co-host form input with pre-existing co-host names, if they exist
 */
const fill_co_host_form = () => {
    const ch_inpt = document.getElementById("co_host");

    const co_hosts = get_co_hosts();
    if(co_hosts.length > 0) {
        const ch_str = co_hosts.join(", ");
        ch_inpt.value = co_hosts;
    }
}

/**
 * Build a row in the attendee table for the given attendee
 * @param {HTMLTableElement} table 
 * @param {Attendee} attendee 
 */
const build_attendee_row = (table, attendee) => {
    const row = document.createElement("tr");

    // Info
    const info_td = document.createElement("td");
    const info = `
        ${attendee.first_name} ${attendee.last_name}<br />
        ${attendee.email}
    `;
    info_td.innerHTML = info;

    // Role dropdown
    const roles = ["Host", "Co-Host", "Invitee"];
    const role_td = document.createElement("td");
    const role_select = document.createElement("select");
    roles.forEach(role => {
        const option = document.createElement("option");
        option.value = role;
        option.text = role;
        if (role === attendee.role) {
            option.selected = true;
        }
        role_select.appendChild(option);
    });
    role_td.appendChild(role_select);

    // Edit button
    const edit_td = document.createElement("td");
    const edit_btn = document.createElement("button");
    edit_btn.innerText = "E";
    edit_td.appendChild(edit_btn);

    // Message button
    const message_td = document.createElement("td");
    const message_btn = document.createElement("button");
    message_btn.innerText = "M";
    message_td.appendChild(message_btn);

    // Delete button
    const delete_td = document.createElement("td");
    const delete_btn = document.createElement("button");
    delete_btn.innerText = "D";
    delete_td.appendChild(delete_btn);

    row.appendChild(info_td);
    row.appendChild(role_td);
    row.appendChild(edit_td);
    row.appendChild(message_td);
    row.appendChild(delete_td);

    table.appendChild(row);
}
const build_default_attendee_row = (table) => {
    const row = document.createElement("tr");

    // Info
    const info_td = document.createElement("td");
    const info = `
        First Last Name<br />
        address@email.com
    `;
    info_td.innerHTML = info;

    // Role dropdown
    const roles = ["Host", "Co-Host", "Invitee"];
    const role_td = document.createElement("td");
    const role_select = document.createElement("select");
    roles.forEach(role => {
        const option = document.createElement("option");
        option.value = role;
        option.text = role;
        if (role === "Host") {
            option.selected = true;
        }
        role_select.appendChild(option);
    });
    role_td.appendChild(role_select);

    // Edit button
    const edit_td = document.createElement("td");
    const edit_btn = document.createElement("button");
    edit_btn.innerText = "E";
    edit_td.appendChild(edit_btn);

    // Message button
    const message_td = document.createElement("td");
    const message_btn = document.createElement("button");
    message_btn.innerText = "M";
    message_td.appendChild(message_btn);

    // Delete button
    const delete_td = document.createElement("td");
    const delete_btn = document.createElement("button");
    delete_btn.innerText = "D";
    delete_td.appendChild(delete_btn);

    row.appendChild(info_td);
    row.appendChild(role_td);
    row.appendChild(edit_td);
    row.appendChild(message_td);
    row.appendChild(delete_td);

    table.appendChild(row);
}
const fill_attendee_table = (table) => {
    table.innerHTML = "";
    const attendees = get_all_attendees();
    if(attendees.length > 0) {
        attendees.forEach(attendee => {
            build_attendee_row(table, attendee); 
        });
    } else {
        build_default_attendee_row(table);
    }
}

const load_display = (dom) => {
    // Load talk info
    fill_talk_form(dom.title_inpt, dom.descr_inpt, dom.img);

    // Load co-hosts
    fill_co_host_form();

    // Load attendee table
    const table = document.getElementById("attendee_table");
    fill_attendee_table(table);
    

    console.log("Display loaded");
}


/* EVENT LISTENERS */
/**
 * Get the event handlers for the buttons on the page
 * @returns {Object} An object containing the event handler functions
 */
const get_event_handlers = () => {
    return {
        img_click_evt: (file_inpt) => {
            console.log("Image clicked");
            file_inpt.click();
        },
        upload_img_evt: (file) => {
            console.log("Upload opened");
            // TODO: Format and display image
        },

        delete_click_evt: () => {
            console.log("Delete button clicked");
            // TODO: Delete talk
            //  1. Tell backend to delete from database
            //  2. Go back to previous page
        },

        copy_click_evt: (copy_popup) => {
            console.log("Copy button clicked");
            const url = window.location.href;
            navigator.clipboard.writeText(url);
            // Display popup
            copy_popup.style.display = "block";
            setTimeout(() => copy_popup.style.display = "none", 2000);  // disappear after 2 seconds
        },

        share_click_evt: () => {
            console.log("Share button clicked")
            // TODO: Share talk
            //  1. Open sharable platforms popup
        },

        save_click_evt: (evt) => {
            evt.preventDefault();
            console.log("Save talk button pushed");

            const form = document.getElementById("talk_info_form");
            const form_data = new FormData(form);

            // TODO: Send form data to backend
            console.log(`Sending ${form_data}`);
        },

        add_co_host_click_evt: (evt, form) => {
            evt.preventDefault();
            console.log("Add co-host(s) button pushed");

            const form_data = new FormData(form);
            const email_str = form_data.get("co_host");
            let emails = [];
            try {
                emails = email_str.replaceAll(" ", "").split(",");
            } catch (error) {
                console.log("Can't get emails from form data");
                return;
            }

            // TODO: Send form data to backend
            //  1. Check if already exists
            //      a. If not, add
            //      b. If so, skip?
            console.log(`Adding co-hosts: ${emails}`);
        },
    }
};

const add_event_listeners = (dom, handlers) => {
    dom.img.addEventListener("click", () => { handlers.img_click_evt(dom.img_file_input) });
    dom.img_container.addEventListener("change", (evt) => {
        try {
            const file = evt.target.files[0];
            if (file) {
                handlers.upload_img_evt(file);
            } else {
                throw Error("File cannot be found");
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            return;
        }
    });

    dom.delete_talk_btn.addEventListener("click", handlers.delete_click_evt);
    dom.copy_talk_btn.addEventListener("click", () => { handlers.copy_click_evt(dom.copy_popup) });
    dom.share_talk_btn.addEventListener("click", handlers.share_click_evt);

    dom.save_talk_btn.addEventListener("click", handlers.save_click_evt);

    dom.add_co_host_btn.addEventListener("click", handlers.add_co_host_click_evt);
}

const init = () => {
    const dom = {
        img: document.getElementById("image"),
        img_container: document.getElementById("image_container"),
        img_file_input: document.getElementById("image_file_input"),

        delete_talk_btn: document.getElementById("delete_talk"),
        copy_talk_btn: document.getElementById("copy_talk"),
        copy_popup: document.getElementById("url_copied"),
        share_talk_btn: document.getElementById("share_talk"),

        title_inpt: document.getElementById("title"),
        descr_inpt: document.getElementById("description"),
        save_talk_btn: document.getElementById("save_talk_info"),

        co_host_inpt: document.getElementById("co_host"),
        add_co_host_btn: document.getElementById("add_co_host"),

        attendee_tbl: document.getElementById("attendee_table"),
    }

    const handlers = get_event_handlers();
    add_event_listeners(dom, handlers);

    load_display(dom);
}

export { init }