async function LoadData() {
    let res = await fetch("http://localhost:3000/posts");
    let posts = await res.json();
    let body = document.getElementById("body_table");
    body.innerHTML = '';

    for (const post of posts) {
        let style = post.isDeleted ?
            "text-decoration: line-through; color: gray;" :
            "";

        let btn = post.isDeleted ?
            "" :
            `<input type="submit" value="Delete" onclick="Delete('${post.id}')"/>`;

        body.innerHTML += `
        <tr style="${style}">
            <td>${post.id}</td>
            <td>${post.title}</td>
            <td>${post.views}</td>
            <td>${btn}</td>
        </tr>`;
    }
}

// Lấy ID tự tăng cho Post (dạng chuỗi)
async function getNextPostId() {
    let res = await fetch("http://localhost:3000/posts");
    let posts = await res.json();
    if (posts.length === 0) return "1";

    let maxId = Math.max(...posts.map(p => Number(p.id)));
    return String(maxId + 1);
}

async function Save() {
    let id = document.getElementById("id_txt").value;
    let title = document.getElementById("title_txt").value;
    let views = document.getElementById("view_txt").value;

    // UPDATE
    if (id !== "") {
        let getItem = await fetch("http://localhost:3000/posts/" + id);
        if (getItem.ok) {
            await fetch("http://localhost:3000/posts/" + id, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: title,
                    views: views
                })
            });
            LoadData();
            return;
        }
    }

    // CREATE (ID tự tăng)
    let newId = await getNextPostId();
    await fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: newId,
            title: title,
            views: views,
            isDeleted: false
        })
    });

    LoadData();
}

// XÓA MỀM
async function Delete(id) {
    await fetch("http://localhost:3000/posts/" + id, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            isDeleted: true
        })
    });
    LoadData();
}

LoadData();