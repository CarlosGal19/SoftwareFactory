const major = [
    {
        "name": "TIIA",
        "description": "Tecnologías de la Información y la Inteligencia Artificial"
    },
    {
        "name": "TIDSM",
        "description": "Tecnologías de la Información y Desarrollo de Software Multiplataforma"
    },
    {
        "name": "NAM",
        "description": "Nanotecnología Área Materiales"
    },
    {
        "name": "MAR",
        "description": "Mecatrónica Área Robótica"
    }
]

const userType = [
    {
        "name": "Admin",
        "description": "Administrador"
    },
    {
        "name": "User",
        "description": "Usuario"
    }
]

const user = [
    {
        "name": "Carlos",
        "last_name": "Galindo",
        "user_name": "CarlosGal19",
        "email": "utm22030587@utma.edu.mx",
        "birth_date": "2004-09-10",
        "genre": "M",
        "user_type_id": 1,
        "major_id": 2,
        "password": "123456"
    },
    {
        "name": "Juan",
        "last_name": "Perez",
        "user_name": "JuanPerez17",
        "email": "juan@gmail.com",
        "birth_date": "2003-07-17",
        "genre": "M",
        "user_type_id": 2,
        "major_id": 1,
        "password": "123456"
    },
    {
        "name": "Ana",
        "last_name": "Gomez",
        "user_name": "AnaGomez21",
        "email": "ana@gmail.com",
        "birth_date": "2002-01-21",
        "genre": "F",
        "user_type_id": 2,
        "major_id": 3,
        "password": "123456"
    },
    {
        "name": "Maria",
        "last_name": "Lopez",
        "user_name": "MariaLopez22",
        "email": "pedro1@gmail.com",
        "birth_date": "2001-12-22",
        "genre": "F",
        "user_type_id": 2,
        "major_id": 4,
        "password": "123456"
    },
    {
        "name": "Alvaro",
        "last_name": "Esparza",
        "user_name": "AlvaroEsp666",
        "email": "alvaro@gmail.com",
        "birth_date": "2000-06-06",
        "genre": "M",
        "user_type_id": 2,
        "major_id": 2,
        "password": "123456"
    }
]

const forum = [
    {
        "name": "Foro de Tecnologías de la Información y la Inteligencia Artificial",
        "description": "Foro de discusión sobre Tecnologías de la Información y la Inteligencia Artificial"
    },
    {
        "name": "Foro de Tecnologías de la Información y Desarrollo de Software Multiplataforma",
        "description": "Foro de discusión sobre Tecnologías de la Información y Desarrollo de Software Multiplataforma"
    },
    {
        "name": "Foro de Nanotecnología Área Materiales",
        "description": "Foro de discusión sobre Nanotecnología Área Materiales"
    },
    {
        "name": "Foro de Mecatrónica Área Robótica",
        "description": "Foro de discusión sobre Mecatrónica Área Robótica"
    }
]

const topic = [
    {
        "name": "Tema 1",
        "description": "Descripción del tema 1",
        "forum_id": 1
    },
    {
        "name": "Tema 2",
        "description": "Descripción del tema 2",
        "forum_id": 2
    },
    {
        "name": "Tema 3",
        "description": "Descripción del tema 3",
        "forum_id": 3
    },
    {
        "name": "Tema 4",
        "description": "Descripción del tema 4",
        "forum_id": 4
    }
]

const post = [
    {
        "topic_id": 1,
        "content": "Contenido del post 1",
        "url_img": "https://cdn.pixabay.com/photo/2016/10/26/19/00/domain-names-1772242_1280.jpg"
    },
    {
        "topic_id": 2,
        "content": "Contenido del post 2",
        "url_img": "https://cdn.pixabay.com/photo/2016/10/26/19/00/domain-names-1772242_1280.jpg"
    },
    {
        "topic_id": 3,
        "content": "Contenido del post 3",
        "url_img": "https://cdn.pixabay.com/photo/2016/10/26/19/00/domain-names-1772242_1280.jpg"
    },
    {
        "topic_id": 4,
        "content": "Contenido del post 4",
        "url_img": "https://cdn.pixabay.com/photo/2016/10/26/19/00/domain-names-1772242_1280.jpg"
    }
]

const friendRequest = [
    {
        "receiver_id": 2
    },
    {
        "receiver_id": 3
    },
    {
        "receiver_id": 4
    }
];
