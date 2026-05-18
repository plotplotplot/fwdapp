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
    //  Call backend
    
    return {
        "title": null,
        "descr": null,
        "img": null
    };
}

const fill_talk_form = () => {
    const title_inpt = document.getElementById("title");
    const descr_inpt = document.getElementById("description");
    const img = document.getElementById("image");

    const talk_info = get_talk_info();

    title_inpt.setAttribute("placeholder", talk_info["title"]);
    descr_inpt.setAttribute("placeholder", talk_info["descr"]);
    img.setAttribute("src", talk_info["img"]);
}

/**
 * @returns {Attendee[]} List of all attendees (including host and co-hosts)
 */
const get_all_attendees = () => {
    // TODO: Get attendee names, emails, and roles
    //  Call backend
    //  Turn to class objects

    return [];
}
const build_attendee_row = (table, attendee) => {
    const row = document.createElement("tr");

    // Info
    const info_td = document.createElement("td");
    const info = `
        ${attendee.first_name} ${attendee.last_name}<br />
        ${attendee.email}
    `;
    info_td.appendChild(info);

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
    edit_btn.innerText = "Edit";
    edit_td.appendChild(edit_btn);

    // Message button
    const message_td = document.createElement("td");
    const message_btn = document.createElement("button");
    message_btn.innerText = "Message";
    message_td.appendChild(message_btn);

    // Delete button
    const delete_td = document.createElement("td");
    const delete_btn = document.createElement("button");
    delete_btn.innerText = "Delete";
    delete_td.appendChild(delete_btn);

    row.appendChild(info_td);
    row.appendChild(role_td);
    row.appendChild(edit_td);
    row.appendChild(message_td);
    row.appendChild(delete_td);

    table.appendChild(row);
}

const load_display = () => {
    // Load talk info
    fill_talk_form();

    // Load co-hosts
    

    // Load attendee table
    const table = document.getElementById("attendee_table");
    const attendees = get_all_attendees();
    attendees.forEach(attendee => {
       build_attendee_row(table, attendee); 
    });
}




/* EVENT LISTENERS */
/* Upload Image */
const img_container = document.getElementById("image_container");
const img = document.getElementById("image");
const img_file_input = document.getElementById("image_file_input");

img_container.addEventListener("click", () => {
    console.log("Image container clicked");
    img_file_input.click();
});
img_file_input.addEventListener("change", (evt) => {
    try {
        const file = evt.target.files[0];
        if (file) {
            // TODO: Format and display image
        }
    } catch (error) {
        console.error("Error uploading image:", error);
        return;
    }
});

/* TODO: Delete Talk */
const delete_talk_btn = document.getElementById("delete_talk");

/* Copy Talk (URL) */
const copy_talk_btn = document.getElementById("copy_talk");
const copy_popup = document.getElementById("url_copied");

copy_talk_btn.addEventListener("click", () => {
    url = window.location.href;
    navigator.clipboard.writeText(url);
    // Display popup
    copy_popup.style.display = "block";
    setTimeout(() => copy_popup.style.display = "none", 2000);  // disappear after 2 seconds
});

/* Save Talk Info (Title and description) */
const save_talk_btn = document.getElementById("save_talk_info");

save_talk_btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    console.log("Save talk button pushed");

    const form = document.getElementById("talk_info_form");
    const form_data = new FormData(form);

    // TODO: Send form data to backend
    console.log(`Sending ${form_data}`);
});

/* Add Co-Hosts */
add_co_host_btn = document.getElementById("add_co_host");

add_co_host_btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    console.log("Add co-host(s) button pushed");

    const form = document.getElementById("co_host_form");
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
    console.log(`Adding co-hosts: ${emails}`);
});

document.addEventListener("load", () => {
    // TODO: Load talk, co-host, and attendant info, if exists
});