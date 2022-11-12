let userData = [];

const fetchUsers = async () =>
{
    await fetch("https://randomuser.me/api/?results=24")
    .then((res) => res.json())
    .then((data) =>
    {
        const { results } = data;
        userData = results;
    });
}

const userDisplay = async () =>
{
    await fetchUsers();

    const dateParser = (date) =>
    {
        let newDate = new Date(date).toLocaleDateString("fr-FR",
        {
            year: "numeric",
            month: "long",
            day: "numeric"
        });
        return newDate;
    };

    const dayCalc = (date) =>
    {
        let today = new Date();
        let todayTimeStamp = Date.parse(today);
        let timeStamp = Date.parse(date);

        return Math.floor((todayTimeStamp-timeStamp)/(1000*60*60*24));
    };

    userData.forEach((user) =>
    {
        const maleOrFemale = user.gender === "male" ? "" : "e";
        document.body.innerHTML +=
        `
            <div class="card">
                <img src="${user.picture.large}" alt="Photo d'une personne">
                <h3>${user.name.first}</h3>
                <br>
                <p>Né${maleOrFemale} le ${dateParser(user.dob.date)} à ${user.location.city}</p>
                <em>Membre depuis : ${dayCalc(user.registered.date)} jours</em>
            </div>
        `;
    });

    // document.body.innerHTML = userData.map((user) =>
    //     {
    //         `
    //         <div class="card">
    //             <img src="${user.picture.large}" alt="Photo d'une personne">
    //             <h3>${user.name.first}</h3>
    //             <br>
    //             <p>Né(e) le ${dateParser(user.dob.date)} à ${user.location.city}</p>
    //             <em>Membre depuis : ${dayCalc(user.registered.date)} jours</em>
    //         </div>
    //         `
    //     }
    // )
    // .join("");
};
userDisplay();