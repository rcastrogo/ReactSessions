import type { ErrorStack } from "../models/ErrorStack";
import type { Role } from "../models/Role";
import type { User } from "../models/User";

/**
 * Simulated network delay helper
 * @param ms milliseconds to wait
 */
export const delay = (ms = 800) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Mock data sources (replace with your JSON content)
 */
const mockUsers: User[] =[
  {
    "id": 1,
    "full_name": "Severino España, Rodríguez",
    "das": "A00001",
    "project": "INNOVATE LAB",
    "email": "severino.españa,1@ern.com",
    "imagen_url": null,
    "line_manager": 12,
    "aspiring_role": 5,
    "role_assigned_date": "2025-04-28",
    "created_at": "2023-11-28T08:54:42Z",
    "updated_at": "2024-12-20T18:54:29Z",
    "cv_url": null,
    "access_type": "User",
    "role_history": [],
    "dedication": 74
  },
  {
    "id": 2,
    "full_name": "Galo Agudo, Checa",
    "das": "A00002",
    "project": "ACME EXTREME",
    "email": "galo.agudo,2@ern.com",
    "imagen_url": null,
    "line_manager": 33,
    "aspiring_role": 1,
    "role_assigned_date": "2025-06-25",
    "created_at": "2024-07-14T20:05:03Z",
    "updated_at": "2025-10-08T01:14:39Z",
    "cv_url": null,
    "access_type": "Mentor",
    "role_history": [],
    "dedication": 92
  },
  {
    "id": 3,
    "full_name": "Guadalupe Segovia, Esparza",
    "das": "A00003",
    "project": "INNOVATE LAB",
    "email": "guadalupe.segovia,3@ern.com",
    "imagen_url": null,
    "line_manager": 33,
    "aspiring_role": 4,
    "role_assigned_date": "2025-08-12",
    "created_at": "2024-06-16T03:53:41Z",
    "updated_at": "2025-11-21T15:58:46Z",
    "cv_url": null,
    "access_type": "Mentor",
    "role_history": [],
    "dedication": 88
  },
  {
    "id": 4,
    "full_name": "Pilar Murcia, Ávila",
    "das": "A00004",
    "project": "GLOBAL TECH",
    "email": "pilar.murcia,4@ern.com",
    "imagen_url": null,
    "line_manager": 531,
    "aspiring_role": 2,
    "role_assigned_date": "2025-08-04",
    "created_at": "2024-01-21T21:24:05Z",
    "updated_at": "2025-06-28T10:43:12Z",
    "cv_url": null,
    "access_type": "Mentor",
    "role_history": [],
    "dedication": 51
  },
  {
    "id": 5,
    "full_name": "Leandro Carbonell, Lorenzo",
    "das": "A00005",
    "project": "GLOBAL TECH",
    "email": "leandro.carbonell,5@ern.com",
    "imagen_url": null,
    "line_manager": 12,
    "aspiring_role": 4,
    "role_assigned_date": "2025-01-16",
    "created_at": "2024-02-09T12:13:31Z",
    "updated_at": "2025-02-28T13:20:15Z",
    "cv_url": null,
    "access_type": "Mentor",
    "role_history": [],
    "dedication": 70
  },
  {
    "id": 6,
    "full_name": "Flavio Cruz, Fajardo",
    "das": "A00006",
    "project": "GLOBAL TECH",
    "email": "flavio.cruz,6@ern.com",
    "imagen_url": null,
    "line_manager": 1,
    "aspiring_role": 2,
    "role_assigned_date": "2025-02-16",
    "created_at": "2024-09-16T05:48:20Z",
    "updated_at": "2025-07-02T04:02:01Z",
    "cv_url": null,
    "access_type": "User",
    "role_history": [],
    "dedication": 93
  },
  {
    "id": 7,
    "full_name": "Tania Llano, Meléndez",
    "das": "A00007",
    "project": "PROJECT X",
    "email": "tania.llano,7@ern.com",
    "imagen_url": null,
    "line_manager": 33,
    "aspiring_role": 3,
    "role_assigned_date": "2024-12-07",
    "created_at": "2024-01-02T05:05:14Z",
    "updated_at": "2025-09-14T09:34:11Z",
    "cv_url": null,
    "access_type": "Admin",
    "role_history": [],
    "dedication": 58
  },
  {
    "id": 8,
    "full_name": "Fátima Aguilera, Sabater",
    "das": "A00008",
    "project": "INNOVATE LAB",
    "email": "fátima.aguilera,8@ern.com",
    "imagen_url": null,
    "line_manager": 96,
    "aspiring_role": 1,
    "role_assigned_date": "2025-06-17",
    "created_at": "2024-01-05T14:11:54Z",
    "updated_at": "2025-01-01T08:11:35Z",
    "cv_url": null,
    "access_type": "User",
    "role_history": [],
    "dedication": 77
  },
  {
    "id": 9,
    "full_name": "Lope Garay, Girona",
    "das": "A00009",
    "project": "GLOBAL TECH",
    "email": "lope.garay,9@ern.com",
    "imagen_url": null,
    "line_manager": 1,
    "aspiring_role": 4,
    "role_assigned_date": "2025-06-24",
    "created_at": "2024-08-04T22:23:58Z",
    "updated_at": "2025-06-02T00:10:32Z",
    "cv_url": null,
    "access_type": "User",
    "role_history": [],
    "dedication": 91
  },
  {
    "id": 10,
    "full_name": "Ester Peñalver, Pelayo",
    "das": "A00010",
    "project": "ACME EXTREME",
    "email": "ester.peñalver,10@ern.com",
    "imagen_url": null,
    "line_manager": 25,
    "aspiring_role": 4,
    "role_assigned_date": "2025-10-09",
    "created_at": "2023-12-17T10:02:05Z",
    "updated_at": "2025-07-16T20:47:14Z",
    "cv_url": null,
    "access_type": "User",
    "role_history": [],
    "dedication": 76
  },
  {
    "id": 11,
    "full_name": "Jordán Vidal, Cañizares",
    "das": "A00011",
    "project": "PROJECT X",
    "email": "jordán.vidal,11@ern.com",
    "imagen_url": null,
    "line_manager": 12,
    "aspiring_role": 3,
    "role_assigned_date": "2025-04-16",
    "created_at": "2024-04-09T15:02:09Z",
    "updated_at": "2025-04-10T16:03:34Z",
    "cv_url": null,
    "access_type": "Mentor",
    "role_history": [],
    "dedication": 88
  },
  {
    "id": 12,
    "full_name": "Berta Cabo, Benito",
    "das": "A00012",
    "project": "GLOBAL TECH",
    "email": "berta.cabo,12@ern.com",
    "imagen_url": null,
    "line_manager": 1,
    "aspiring_role": 2,
    "role_assigned_date": "2025-05-24",
    "created_at": "2024-01-25T01:19:30Z",
    "updated_at": "2025-04-26T13:33:42Z",
    "cv_url": null,
    "access_type": "Mentor",
    "role_history": [],
    "dedication": 89
  },
  {
    "id": 13,
    "full_name": "Oriana Galindo, Benito",
    "das": "A00013",
    "project": "ACME EXTREME",
    "email": "oriana.galindo,13@ern.com",
    "imagen_url": null,
    "line_manager": 1,
    "aspiring_role": 4,
    "role_assigned_date": "2025-09-05",
    "created_at": "2024-03-20T03:54:39Z",
    "updated_at": "2025-02-27T16:17:47Z",
    "cv_url": null,
    "access_type": "Admin",
    "role_history": [],
    "dedication": 53
  },
  {
    "id": 14,
    "full_name": "Viviana Villanueva, Serra",
    "das": "A00014",
    "project": "PROJECT X",
    "email": "viviana.villanueva,14@ern.com",
    "imagen_url": null,
    "line_manager": 25,
    "aspiring_role": 4,
    "role_assigned_date": "2025-10-24",
    "created_at": "2024-01-24T21:52:45Z",
    "updated_at": "2025-11-22T02:25:55Z",
    "cv_url": null,
    "access_type": "Admin",
    "role_history": [],
    "dedication": 53
  },
  {
    "id": 15,
    "full_name": "Noelia Anglada, Guillén",
    "das": "A00015",
    "project": "PROJECT X",
    "email": "noelia.anglada,15@ern.com",
    "imagen_url": null,
    "line_manager": 1,
    "aspiring_role": 4,
    "role_assigned_date": "2024-12-12",
    "created_at": "2024-11-11T07:16:45Z",
    "updated_at": "2025-11-10T16:39:47Z",
    "cv_url": null,
    "access_type": "User",
    "role_history": [],
    "dedication": 91
  },
  {
    "id": 16,
    "full_name": "Encarnita Benítez, Camacho",
    "das": "A00016",
    "project": "INNOVATE LAB",
    "email": "encarnita.benítez,16@ern.com",
    "imagen_url": null,
    "line_manager": 33,
    "aspiring_role": 1,
    "role_assigned_date": "2025-06-25",
    "created_at": "2024-04-05T10:59:05Z",
    "updated_at": "2024-12-28T01:29:53Z",
    "cv_url": null,
    "access_type": "Mentor",
    "role_history": [],
    "dedication": 54
  },
  {
    "id": 17,
    "full_name": "Eutimio Tomás, Dueñas",
    "das": "A00017",
    "project": "PROJECT X",
    "email": "eutimio.tomás,17@ern.com",
    "imagen_url": null,
    "line_manager": 12,
    "aspiring_role": 4,
    "role_assigned_date": "2025-04-16",
    "created_at": "2023-12-03T01:20:21Z",
    "updated_at": "2025-01-23T04:28:35Z",
    "cv_url": null,
    "access_type": "Admin",
    "role_history": [],
    "dedication": 94
  },
  {
    "id": 18,
    "full_name": "Juan Luis Vall, Mosquera",
    "das": "A00018",
    "project": "ACME EXTREME",
    "email": "juan.luis18@ern.com",
    "imagen_url": null,
    "line_manager": 33,
    "aspiring_role": 4,
    "role_assigned_date": "2025-04-27",
    "created_at": "2024-02-03T08:46:05Z",
    "updated_at": "2025-01-27T04:35:47Z",
    "cv_url": null,
    "access_type": "Admin",
    "role_history": [],
    "dedication": 99
  },
  {
    "id": 19,
    "full_name": "Régulo Segura, Lluch",
    "das": "A00019",
    "project": "ACME EXTREME",
    "email": "régulo.segura,19@ern.com",
    "imagen_url": null,
    "line_manager": 12,
    "aspiring_role": 2,
    "role_assigned_date": "2025-03-21",
    "created_at": "2024-06-28T10:19:44Z",
    "updated_at": "2025-05-22T07:40:46Z",
    "cv_url": null,
    "access_type": "Admin",
    "role_history": [],
    "dedication": 80
  },
  {
    "id": 20,
    "full_name": "Celestina Sanz, Riba",
    "das": "A00020",
    "project": "ACME EXTREME",
    "email": "celestina.sanz,20@ern.com",
    "imagen_url": null,
    "line_manager": 33,
    "aspiring_role": 3,
    "role_assigned_date": "2025-01-27",
    "created_at": "2024-06-14T15:43:10Z",
    "updated_at": "2025-04-09T18:56:01Z",
    "cv_url": null,
    "access_type": "Admin",
    "role_history": [],
    "dedication": 67
  },
  {
    "id": 21,
    "full_name": "Rafa Lobato, Menéndez",
    "das": "A00021",
    "project": "ACME EXTREME",
    "email": "rafa.lobato,21@ern.com",
    "imagen_url": null,
    "line_manager": 25,
    "aspiring_role": 3,
    "role_assigned_date": "2025-10-30",
    "created_at": "2024-05-31T12:09:47Z",
    "updated_at": "2025-11-01T04:55:46Z",
    "cv_url": null,
    "access_type": "User",
    "role_history": [],
    "dedication": 73
  },
  {
    "id": 22,
    "full_name": "Paloma Heredia, Amores",
    "das": "A00022",
    "project": "INNOVATE LAB",
    "email": "paloma.heredia,22@ern.com",
    "imagen_url": null,
    "line_manager": 33,
    "aspiring_role": 4,
    "role_assigned_date": "2025-03-02",
    "created_at": "2024-07-01T15:03:10Z",
    "updated_at": "2025-02-08T13:05:13Z",
    "cv_url": null,
    "access_type": "Admin",
    "role_history": [],
    "dedication": 87
  },
  {
    "id": 23,
    "full_name": "Bruno Araujo, Gomez",
    "das": "A00023",
    "project": "INNOVATE LAB",
    "email": "bruno.araujo,23@ern.com",
    "imagen_url": null,
    "line_manager": 25,
    "aspiring_role": 3,
    "role_assigned_date": "2025-09-25",
    "created_at": "2024-09-16T20:07:08Z",
    "updated_at": "2025-04-27T15:27:51Z",
    "cv_url": null,
    "access_type": "Mentor",
    "role_history": [],
    "dedication": 59
  },
  {
    "id": 24,
    "full_name": "Luciana Ibáñez, Galván",
    "das": "A00024",
    "project": "INNOVATE LAB",
    "email": "luciana.ibáñez,24@ern.com",
    "imagen_url": null,
    "line_manager": 12,
    "aspiring_role": 1,
    "role_assigned_date": "2025-08-22",
    "created_at": "2024-03-26T06:48:41Z",
    "updated_at": "2025-11-09T17:08:26Z",
    "cv_url": null,
    "access_type": "Mentor",
    "role_history": [],
    "dedication": 60
  },
  {
    "id": 25,
    "full_name": "Rolando Huguet, Pascual",
    "das": "A00025",
    "project": "GLOBAL TECH",
    "email": "rolando.huguet,25@ern.com",
    "imagen_url": null,
    "line_manager": 25,
    "aspiring_role": 4,
    "role_assigned_date": "2025-09-07",
    "created_at": "2024-07-18T22:06:44Z",
    "updated_at": "2025-07-25T22:24:51Z",
    "cv_url": null,
    "access_type": "Mentor",
    "role_history": [],
    "dedication": 91
  },
  {
    "id": 26,
    "full_name": "Lalo Gómez, Manzanares",
    "das": "A00026",
    "project": "PROJECT X",
    "email": "lalo.gómez,26@ern.com",
    "imagen_url": null,
    "line_manager": 25,
    "aspiring_role": 5,
    "role_assigned_date": "2025-02-07",
    "created_at": "2024-08-01T21:19:58Z",
    "updated_at": "2025-01-22T10:01:16Z",
    "cv_url": null,
    "access_type": "User",
    "role_history": [],
    "dedication": 85
  },
  {
    "id": 27,
    "full_name": "Caridad Campo, Galvez",
    "das": "A00027",
    "project": "PROJECT X",
    "email": "caridad.campo,27@ern.com",
    "imagen_url": null,
    "line_manager": 25,
    "aspiring_role": 3,
    "role_assigned_date": "2024-11-30",
    "created_at": "2024-06-10T19:11:12Z",
    "updated_at": "2025-06-28T12:55:20Z",
    "cv_url": null,
    "access_type": "User",
    "role_history": [],
    "dedication": 70
  },
  {
    "id": 28,
    "full_name": "Paca Olmedo, Peiró",
    "das": "A00028",
    "project": "ACME EXTREME",
    "email": "paca.olmedo,28@ern.com",
    "imagen_url": null,
    "line_manager": 12,
    "aspiring_role": 3,
    "role_assigned_date": "2025-05-05",
    "created_at": "2024-01-19T16:47:16Z",
    "updated_at": "2025-02-17T03:02:56Z",
    "cv_url": null,
    "access_type": "Mentor",
    "role_history": [],
    "dedication": 53
  },
  {
    "id": 29,
    "full_name": "Heraclio Pedrosa, Bayón",
    "das": "A00029",
    "project": "GLOBAL TECH",
    "email": "heraclio.pedrosa,29@ern.com",
    "imagen_url": null,
    "line_manager": 12,
    "aspiring_role": 1,
    "role_assigned_date": "2024-12-31",
    "created_at": "2024-11-10T19:26:09Z",
    "updated_at": "2025-03-27T02:01:29Z",
    "cv_url": null,
    "access_type": "User",
    "role_history": [],
    "dedication": 53
  },
  {
    "id": 30,
    "full_name": "Patricio Coronado, Galvez",
    "das": "A00030",
    "project": "ACME EXTREME",
    "email": "patricio.coronado,30@ern.com",
    "imagen_url": null,
    "line_manager": 12,
    "aspiring_role": 3,
    "role_assigned_date": "2024-12-24",
    "created_at": "2024-11-18T05:21:38Z",
    "updated_at": "2024-12-20T02:58:00Z",
    "cv_url": null,
    "access_type": "Mentor",
    "role_history": [],
    "dedication": 72
  },
  {
    "id": 31,
    "full_name": "Fulgencio Palau, Ugarte",
    "das": "A00031",
    "project": "GLOBAL TECH",
    "email": "fulgencio.palau,31@ern.com",
    "imagen_url": null,
    "line_manager": 33,
    "aspiring_role": 2,
    "role_assigned_date": "2025-06-21",
    "created_at": "2024-10-28T21:01:39Z",
    "updated_at": "2025-08-05T02:45:11Z",
    "cv_url": null,
    "access_type": "User",
    "role_history": [],
    "dedication": 88
  },
  {
    "id": 32,
    "full_name": "Ildefonso Iglesias, Valle",
    "das": "A00032",
    "project": "INNOVATE LAB",
    "email": "ildefonso.iglesias,32@ern.com",
    "imagen_url": null,
    "line_manager": 33,
    "aspiring_role": 4,
    "role_assigned_date": "2025-03-12",
    "created_at": "2024-03-11T16:10:12Z",
    "updated_at": "2025-07-19T21:05:26Z",
    "cv_url": null,
    "access_type": "Admin",
    "role_history": [],
    "dedication": 72
  },
  {
    "id": 33,
    "full_name": "Palmira Farré, Coll",
    "das": "A00033",
    "project": "INNOVATE LAB",
    "email": "palmira.farré,33@ern.com",
    "imagen_url": null,
    "line_manager": 33,
    "aspiring_role": 3,
    "role_assigned_date": "2025-05-04",
    "created_at": "2024-03-09T15:58:48Z",
    "updated_at": "2025-05-01T02:23:23Z",
    "cv_url": null,
    "access_type": "User",
    "role_history": [],
    "dedication": 82
  },
  {
    "id": 34,
    "full_name": "Cayetano Santana, Estrada",
    "das": "A00034",
    "project": "INNOVATE LAB",
    "email": "cayetano.santana,34@ern.com",
    "imagen_url": null,
    "line_manager": 33,
    "aspiring_role": 2,
    "role_assigned_date": "2025-01-15",
    "created_at": "2024-05-03T02:53:25Z",
    "updated_at": "2025-05-19T07:47:34Z",
    "cv_url": null,
    "access_type": "Admin",
    "role_history": [],
    "dedication": 74
  },
  {
    "id": 35,
    "full_name": "Encarnita Guerrero, Lloret",
    "das": "A00035",
    "project": "GLOBAL TECH",
    "email": "encarnita.guerrero,35@ern.com",
    "imagen_url": null,
    "line_manager": 1,
    "aspiring_role": 5,
    "role_assigned_date": "2025-05-15",
    "created_at": "2024-05-09T00:21:41Z",
    "updated_at": "2024-12-12T07:23:05Z",
    "cv_url": null,
    "access_type": "User",
    "role_history": [],
    "dedication": 64
  },
  {
    "id": 36,
    "full_name": "Águeda Zapata, Posada",
    "das": "A00036",
    "project": "GLOBAL TECH",
    "email": "águeda.zapata,36@ern.com",
    "imagen_url": null,
    "line_manager": 1,
    "aspiring_role": 2,
    "role_assigned_date": "2025-11-23",
    "created_at": "2024-08-26T02:19:21Z",
    "updated_at": "2025-05-18T14:50:24Z",
    "cv_url": null,
    "access_type": "Admin",
    "role_history": [],
    "dedication": 63
  },
  {
    "id": 37,
    "full_name": "Matilde Aznar, Oliva",
    "das": "A00037",
    "project": "ACME EXTREME",
    "email": "matilde.aznar,37@ern.com",
    "imagen_url": null,
    "line_manager": 531,
    "aspiring_role": 2,
    "role_assigned_date": "2025-06-21",
    "created_at": "2024-01-09T13:42:11Z",
    "updated_at": "2024-12-27T13:20:13Z",
    "cv_url": null,
    "access_type": "Mentor",
    "role_history": [],
    "dedication": 79
  },
  {
    "id": 38,
    "full_name": "Alba Parra, Calleja",
    "das": "A00038",
    "project": "PROJECT X",
    "email": "alba.parra,38@ern.com",
    "imagen_url": null,
    "line_manager": 25,
    "aspiring_role": 4,
    "role_assigned_date": "2025-01-10",
    "created_at": "2024-04-28T09:38:49Z",
    "updated_at": "2025-10-02T20:51:22Z",
    "cv_url": null,
    "access_type": "Admin",
    "role_history": [],
    "dedication": 64
  },
  {
    "id": 39,
    "full_name": "Rosario Saldaña, Español",
    "das": "A00039",
    "project": "ACME EXTREME",
    "email": "rosario.saldaña,39@ern.com",
    "imagen_url": null,
    "line_manager": 96,
    "aspiring_role": 4,
    "role_assigned_date": "2025-09-01",
    "created_at": "2024-01-28T07:53:50Z",
    "updated_at": "2025-10-13T07:36:21Z",
    "cv_url": null,
    "access_type": "User",
    "role_history": [],
    "dedication": 90
  },
  {
    "id": 40,
    "full_name": "Asdrubal Noriega, Lloret",
    "das": "A00040",
    "project": "INNOVATE LAB",
    "email": "asdrubal.noriega,40@ern.com",
    "imagen_url": null,
    "line_manager": 1,
    "aspiring_role": 1,
    "role_assigned_date": "2025-06-06",
    "created_at": "2024-01-08T03:52:26Z",
    "updated_at": "2025-06-09T14:54:25Z",
    "cv_url": null,
    "access_type": "Admin",
    "role_history": [],
    "dedication": 99
  },
  {
    "id": 41,
    "full_name": "Paca Bauzà, Criado",
    "das": "A00041",
    "project": "INNOVATE LAB",
    "email": "paca.bauzà,41@ern.com",
    "imagen_url": null,
    "line_manager": 12,
    "aspiring_role": 5,
    "role_assigned_date": "2025-11-21",
    "created_at": "2024-09-08T00:22:08Z",
    "updated_at": "2025-01-27T20:50:00Z",
    "cv_url": null,
    "access_type": "Mentor",
    "role_history": [],
    "dedication": 55
  },
  {
    "id": 42,
    "full_name": "Rosa María Parra, Reyes",
    "das": "A00042",
    "project": "ACME EXTREME",
    "email": "rosa.maría42@ern.com",
    "imagen_url": null,
    "line_manager": 25,
    "aspiring_role": 3,
    "role_assigned_date": "2025-09-23",
    "created_at": "2024-09-16T19:48:25Z",
    "updated_at": "2024-11-30T18:33:39Z",
    "cv_url": null,
    "access_type": "Mentor",
    "role_history": [],
    "dedication": 90
  },
  {
    "id": 43,
    "full_name": "Julio César Bayón, Bellido",
    "das": "A00043",
    "project": "INNOVATE LAB",
    "email": "julio.césar43@ern.com",
    "imagen_url": null,
    "line_manager": 531,
    "aspiring_role": 4,
    "role_assigned_date": "2025-05-27",
    "created_at": "2024-07-04T02:49:30Z",
    "updated_at": "2025-06-18T12:36:01Z",
    "cv_url": null,
    "access_type": "User",
    "role_history": [],
    "dedication": 60
  },
  {
    "id": 44,
    "full_name": "Valero Espinosa, Roca",
    "das": "A00044",
    "project": "GLOBAL TECH",
    "email": "valero.espinosa,44@ern.com",
    "imagen_url": null,
    "line_manager": 96,
    "aspiring_role": 1,
    "role_assigned_date": "2025-07-18",
    "created_at": "2024-03-19T08:17:36Z",
    "updated_at": "2025-02-04T07:13:13Z",
    "cv_url": null,
    "access_type": "Mentor",
    "role_history": [],
    "dedication": 55
  },
  {
    "id": 45,
    "full_name": "Benita Escudero, Carrasco",
    "das": "A00045",
    "project": "ACME EXTREME",
    "email": "benita.escudero,45@ern.com",
    "imagen_url": null,
    "line_manager": 96,
    "aspiring_role": 4,
    "role_assigned_date": "2025-01-07",
    "created_at": "2024-10-31T10:32:39Z",
    "updated_at": "2025-10-25T05:00:03Z",
    "cv_url": null,
    "access_type": "User",
    "role_history": [],
    "dedication": 76
  },
  {
    "id": 46,
    "full_name": "Calixta Carpio, Zamora",
    "das": "A00046",
    "project": "INNOVATE LAB",
    "email": "calixta.carpio,46@ern.com",
    "imagen_url": null,
    "line_manager": 33,
    "aspiring_role": 2,
    "role_assigned_date": "2025-01-10",
    "created_at": "2024-01-13T05:43:57Z",
    "updated_at": "2025-08-12T03:01:24Z",
    "cv_url": null,
    "access_type": "User",
    "role_history": [],
    "dedication": 84
  },
  {
    "id": 47,
    "full_name": "Hortensia Castellanos, Palomino",
    "das": "A00047",
    "project": "ACME EXTREME",
    "email": "hortensia.castellanos,47@ern.com",
    "imagen_url": null,
    "line_manager": 33,
    "aspiring_role": 3,
    "role_assigned_date": "2025-09-15",
    "created_at": "2024-10-06T10:10:17Z",
    "updated_at": "2025-01-01T17:28:19Z",
    "cv_url": null,
    "access_type": "Admin",
    "role_history": [],
    "dedication": 75
  },
  {
    "id": 48,
    "full_name": "Federico Olivera, Torrent",
    "das": "A00048",
    "project": "GLOBAL TECH",
    "email": "federico.olivera,48@ern.com",
    "imagen_url": null,
    "line_manager": 96,
    "aspiring_role": 1,
    "role_assigned_date": "2025-06-19",
    "created_at": "2024-04-08T05:39:22Z",
    "updated_at": "2025-02-27T21:20:11Z",
    "cv_url": null,
    "access_type": "User",
    "role_history": [],
    "dedication": 80
  },
  {
    "id": 49,
    "full_name": "Calisto Águila, Gámez",
    "das": "A00049",
    "project": "PROJECT X",
    "email": "calisto.águila,49@ern.com",
    "imagen_url": null,
    "line_manager": 1,
    "aspiring_role": 4,
    "role_assigned_date": "2025-02-19",
    "created_at": "2024-08-15T05:17:07Z",
    "updated_at": "2025-03-07T22:20:29Z",
    "cv_url": null,
    "access_type": "Admin",
    "role_history": [],
    "dedication": 81
  },
  {
    "id": 50,
    "full_name": "Marco Belda, Moles",
    "das": "A00050",
    "project": "PROJECT X",
    "email": "marco.belda,50@ern.com",
    "imagen_url": null,
    "line_manager": 96,
    "aspiring_role": 1,
    "role_assigned_date": "2025-08-27",
    "created_at": "2024-03-22T09:08:04Z",
    "updated_at": "2025-09-02T03:58:34Z",
    "cv_url": null,
    "access_type": "Admin",
    "role_history": [],
    "dedication": 57
  },
  {
    "id": 51,
    "full_name": "Nico Sans, Monreal",
    "das": "A00051",
    "project": "INNOVATE LAB",
    "email": "nico.sans,51@ern.com",
    "imagen_url": null,
    "line_manager": 12,
    "aspiring_role": 1,
    "role_assigned_date": "2025-11-15",
    "created_at": "2023-12-23T19:40:28Z",
    "updated_at": "2025-01-25T19:26:17Z",
    "cv_url": null,
    "access_type": "Admin",
    "role_history": [],
    "dedication": 61
  },
  {
    "id": 52,
    "full_name": "María José Pazos, Amaya",
    "das": "A00052",
    "project": "GLOBAL TECH",
    "email": "maría.josé52@ern.com",
    "imagen_url": null,
    "line_manager": 96,
    "aspiring_role": 1,
    "role_assigned_date": "2025-05-03",
    "created_at": "2024-04-22T15:23:20Z",
    "updated_at": "2024-12-31T19:04:06Z",
    "cv_url": null,
    "access_type": "Admin",
    "role_history": [],
    "dedication": 68
  },
  {
    "id": 53,
    "full_name": "Micaela Córdoba, Fonseca",
    "das": "A00053",
    "project": "ACME EXTREME",
    "email": "micaela.córdoba,53@ern.com",
    "imagen_url": null,
    "line_manager": 25,
    "aspiring_role": 4,
    "role_assigned_date": "2024-12-14",
    "created_at": "2024-01-02T20:45:07Z",
    "updated_at": "2025-05-02T05:55:31Z",
    "cv_url": null,
    "access_type": "Admin",
    "role_history": [],
    "dedication": 65
  },
  {
    "id": 54,
    "full_name": "Aarón Zurita, Fortuny",
    "das": "A00054",
    "project": "GLOBAL TECH",
    "email": "aarón.zurita,54@ern.com",
    "imagen_url": null,
    "line_manager": 33,
    "aspiring_role": 2,
    "role_assigned_date": "2025-06-28",
    "created_at": "2024-10-08T19:03:09Z",
    "updated_at": "2025-05-10T19:59:39Z",
    "cv_url": null,
    "access_type": "Mentor",
    "role_history": [],
    "dedication": 81
  },
  {
    "id": 55,
    "full_name": "Lalo Aragón, Conesa",
    "das": "A00055",
    "project": "GLOBAL TECH",
    "email": "lalo.aragón,55@ern.com",
    "imagen_url": null,
    "line_manager": 96,
    "aspiring_role": 1,
    "role_assigned_date": "2024-12-04",
    "created_at": "2024-02-04T07:15:30Z",
    "updated_at": "2025-08-21T22:07:44Z",
    "cv_url": null,
    "access_type": "Mentor",
    "role_history": [],
    "dedication": 74
  },
  {
    "id": 56,
    "full_name": "Leonardo Ávila, Amor",
    "das": "A00056",
    "project": "GLOBAL TECH",
    "email": "leonardo.ávila,56@ern.com",
    "imagen_url": null,
    "line_manager": 12,
    "aspiring_role": 2,
    "role_assigned_date": "2025-03-11",
    "created_at": "2024-11-24T12:41:52Z",
    "updated_at": "2024-12-16T08:07:26Z",
    "cv_url": null,
    "access_type": "Admin",
    "role_history": [],
    "dedication": 54
  },
  {
    "id": 57,
    "full_name": "Adolfo Acuña, Castejón",
    "das": "A00057",
    "project": "ACME EXTREME",
    "email": "adolfo.acuña,57@ern.com",
    "imagen_url": null,
    "line_manager": 1,
    "aspiring_role": 2,
    "role_assigned_date": "2025-03-06",
    "created_at": "2024-08-05T10:34:04Z",
    "updated_at": "2025-04-16T14:52:28Z",
    "cv_url": null,
    "access_type": "Mentor",
    "role_history": [],
    "dedication": 98
  },
  {
    "id": 58,
    "full_name": "Agustina Lucas, Blanco",
    "das": "A00058",
    "project": "INNOVATE LAB",
    "email": "agustina.lucas,58@ern.com",
    "imagen_url": null,
    "line_manager": 1,
    "aspiring_role": 2,
    "role_assigned_date": "2025-06-29",
    "created_at": "2023-12-30T00:01:53Z",
    "updated_at": "2025-05-11T08:07:22Z",
    "cv_url": null,
    "access_type": "User",
    "role_history": [],
    "dedication": 78
  },
  {
    "id": 59,
    "full_name": "Rolando Sancho, Vazquez",
    "das": "A00059",
    "project": "INNOVATE LAB",
    "email": "rolando.sancho,59@ern.com",
    "imagen_url": null,
    "line_manager": 33,
    "aspiring_role": 1,
    "role_assigned_date": "2024-12-16",
    "created_at": "2024-08-04T00:12:59Z",
    "updated_at": "2025-01-26T14:59:08Z",
    "cv_url": null,
    "access_type": "Admin",
    "role_history": [],
    "dedication": 73
  },
  {
    "id": 60,
    "full_name": "Germán Montenegro, Pineda",
    "das": "A00060",
    "project": "GLOBAL TECH",
    "email": "germán.montenegro,60@ern.com",
    "imagen_url": null,
    "line_manager": 1,
    "aspiring_role": 5,
    "role_assigned_date": "2025-02-25",
    "created_at": "2023-12-16T17:27:14Z",
    "updated_at": "2025-08-05T11:45:10Z",
    "cv_url": null,
    "access_type": "Admin",
    "role_history": [],
    "dedication": 87
  },
  {
    "id": 61,
    "full_name": "Vidal Guardia, Rojas",
    "das": "A00061",
    "project": "GLOBAL TECH",
    "email": "vidal.guardia,61@ern.com",
    "imagen_url": null,
    "line_manager": 1,
    "aspiring_role": 5,
    "role_assigned_date": "2025-02-07",
    "created_at": "2024-05-09T17:06:45Z",
    "updated_at": "2025-05-16T15:07:12Z",
    "cv_url": null,
    "access_type": "Admin",
    "role_history": [],
    "dedication": 60
  },
  {
    "id": 62,
    "full_name": "Paulina Cañas, Revilla",
    "das": "A00062",
    "project": "ACME EXTREME",
    "email": "paulina.cañas,62@ern.com",
    "imagen_url": null,
    "line_manager": 1,
    "aspiring_role": 1,
    "role_assigned_date": "2025-01-18",
    "created_at": "2024-04-27T07:48:43Z",
    "updated_at": "2025-09-23T12:54:14Z",
    "cv_url": null,
    "access_type": "User",
    "role_history": [],
    "dedication": 71
  },
  {
    "id": 63,
    "full_name": "Amelia Miranda, Galan",
    "das": "A00063",
    "project": "PROJECT X",
    "email": "amelia.miranda,63@ern.com",
    "imagen_url": null,
    "line_manager": 96,
    "aspiring_role": 2,
    "role_assigned_date": "2025-03-30",
    "created_at": "2024-09-21T11:44:06Z",
    "updated_at": "2024-12-31T20:59:50Z",
    "cv_url": null,
    "access_type": "Mentor",
    "role_history": [],
    "dedication": 56
  },
  {
    "id": 64,
    "full_name": "Ruy Ribas, Fuente",
    "das": "A00064",
    "project": "INNOVATE LAB",
    "email": "ruy.ribas,64@ern.com",
    "imagen_url": null,
    "line_manager": 96,
    "aspiring_role": 4,
    "role_assigned_date": "2025-01-12",
    "created_at": "2024-01-05T02:59:08Z",
    "updated_at": "2025-02-07T21:33:19Z",
    "cv_url": null,
    "access_type": "Admin",
    "role_history": [],
    "dedication": 89
  },
  {
    "id": 65,
    "full_name": "Paco Arregui, Cal",
    "das": "A00065",
    "project": "PROJECT X",
    "email": "paco.arregui,65@ern.com",
    "imagen_url": null,
    "line_manager": 531,
    "aspiring_role": 4,
    "role_assigned_date": "2025-03-18",
    "created_at": "2024-01-13T04:34:46Z",
    "updated_at": "2024-12-24T21:59:48Z",
    "cv_url": null,
    "access_type": "Mentor",
    "role_history": [],
    "dedication": 93
  },
  {
    "id": 66,
    "full_name": "Leonor Giralt, Sosa",
    "das": "A00066",
    "project": "PROJECT X",
    "email": "leonor.giralt,66@ern.com",
    "imagen_url": null,
    "line_manager": 531,
    "aspiring_role": 1,
    "role_assigned_date": "2025-02-17",
    "created_at": "2024-11-08T04:42:45Z",
    "updated_at": "2025-07-31T08:14:04Z",
    "cv_url": null,
    "access_type": "User",
    "role_history": [],
    "dedication": 51
  },
  {
    "id": 67,
    "full_name": "Omar Bou, Mendoza",
    "das": "A00067",
    "project": "INNOVATE LAB",
    "email": "omar.bou,67@ern.com",
    "imagen_url": null,
    "line_manager": 25,
    "aspiring_role": 5,
    "role_assigned_date": "2025-09-22",
    "created_at": "2024-01-11T09:13:23Z",
    "updated_at": "2025-01-19T07:33:35Z",
    "cv_url": null,
    "access_type": "User",
    "role_history": [],
    "dedication": 51
  },
  {
    "id": 68,
    "full_name": "Juliana Cañas, Jaén",
    "das": "A00068",
    "project": "INNOVATE LAB",
    "email": "juliana.cañas,68@ern.com",
    "imagen_url": null,
    "line_manager": 12,
    "aspiring_role": 2,
    "role_assigned_date": "2024-12-26",
    "created_at": "2024-01-04T01:04:59Z",
    "updated_at": "2025-10-25T08:20:31Z",
    "cv_url": null,
    "access_type": "Mentor",
    "role_history": [],
    "dedication": 75
  },
  {
    "id": 69,
    "full_name": "César Toledo, Palomar",
    "das": "A00069",
    "project": "ACME EXTREME",
    "email": "césar.toledo,69@ern.com",
    "imagen_url": null,
    "line_manager": 531,
    "aspiring_role": 3,
    "role_assigned_date": "2025-03-08",
    "created_at": "2024-01-15T08:12:40Z",
    "updated_at": "2025-08-09T13:04:15Z",
    "cv_url": null,
    "access_type": "User",
    "role_history": [],
    "dedication": 51
  },
  {
    "id": 70,
    "full_name": "Carlota Soler, Alberola",
    "das": "A00070",
    "project": "GLOBAL TECH",
    "email": "carlota.soler,70@ern.com",
    "imagen_url": null,
    "line_manager": 25,
    "aspiring_role": 5,
    "role_assigned_date": "2025-03-21",
    "created_at": "2024-01-20T07:37:13Z",
    "updated_at": "2025-03-08T10:56:47Z",
    "cv_url": null,
    "access_type": "User",
    "role_history": [],
    "dedication": 52
  },
  {
    "id": 71,
    "full_name": "Máxima Arnau, Noriega",
    "das": "A00071",
    "project": "INNOVATE LAB",
    "email": "máxima.arnau,71@ern.com",
    "imagen_url": null,
    "line_manager": 12,
    "aspiring_role": 3,
    "role_assigned_date": "2025-01-10",
    "created_at": "2024-09-17T17:56:48Z",
    "updated_at": "2025-01-09T01:35:49Z",
    "cv_url": null,
    "access_type": "User",
    "role_history": [],
    "dedication": 51
  },
  {
    "id": 72,
    "full_name": "Sergio Santamaría, Pizarro",
    "das": "A00072",
    "project": "PROJECT X",
    "email": "sergio.santamaría,72@ern.com",
    "imagen_url": null,
    "line_manager": 96,
    "aspiring_role": 4,
    "role_assigned_date": "2025-01-06",
    "created_at": "2024-06-12T18:01:49Z",
    "updated_at": "2025-01-04T05:15:58Z",
    "cv_url": null,
    "access_type": "Admin",
    "role_history": [],
    "dedication": 80
  },
  {
    "id": 73,
    "full_name": "Felisa Montenegro, Amador",
    "das": "A00073",
    "project": "GLOBAL TECH",
    "email": "felisa.montenegro,73@ern.com",
    "imagen_url": null,
    "line_manager": 25,
    "aspiring_role": 4,
    "role_assigned_date": "2025-10-01",
    "created_at": "2024-05-17T18:21:54Z",
    "updated_at": "2025-08-27T06:20:38Z",
    "cv_url": null,
    "access_type": "Admin",
    "role_history": [],
    "dedication": 87
  },
  {
    "id": 74,
    "full_name": "Ramiro Millán, Arroyo",
    "das": "A00074",
    "project": "ACME EXTREME",
    "email": "ramiro.millán,74@ern.com",
    "imagen_url": null,
    "line_manager": 33,
    "aspiring_role": 2,
    "role_assigned_date": "2025-08-23",
    "created_at": "2024-01-27T04:23:49Z",
    "updated_at": "2025-11-01T06:42:43Z",
    "cv_url": null,
    "access_type": "Mentor",
    "role_history": [],
    "dedication": 76
  },
  {
    "id": 75,
    "full_name": "Vinicio Ángel, Barreda",
    "das": "A00075",
    "project": "PROJECT X",
    "email": "vinicio.ángel,75@ern.com",
    "imagen_url": null,
    "line_manager": 33,
    "aspiring_role": 1,
    "role_assigned_date": "2025-03-20",
    "created_at": "2024-02-02T20:48:05Z",
    "updated_at": "2025-07-19T08:31:03Z",
    "cv_url": null,
    "access_type": "User",
    "role_history": [],
    "dedication": 83
  },
  {
    "id": 76,
    "full_name": "Lope Correa, Alcántara",
    "das": "A00076",
    "project": "GLOBAL TECH",
    "email": "lope.correa,76@ern.com",
    "imagen_url": null,
    "line_manager": 96,
    "aspiring_role": 3,
    "role_assigned_date": "2025-05-31",
    "created_at": "2024-03-10T09:25:49Z",
    "updated_at": "2025-08-29T11:57:16Z",
    "cv_url": null,
    "access_type": "User",
    "role_history": [],
    "dedication": 82
  },
  {
    "id": 77,
    "full_name": "Heliodoro Palomo, Ríos",
    "das": "A00077",
    "project": "ACME EXTREME",
    "email": "heliodoro.palomo,77@ern.com",
    "imagen_url": null,
    "line_manager": 12,
    "aspiring_role": 4,
    "role_assigned_date": "2025-09-24",
    "created_at": "2024-06-24T05:48:46Z",
    "updated_at": "2025-01-30T00:18:02Z",
    "cv_url": null,
    "access_type": "Admin",
    "role_history": [],
    "dedication": 73
  },
  {
    "id": 78,
    "full_name": "Ascensión Pedro, Sosa",
    "das": "A00078",
    "project": "PROJECT X",
    "email": "ascensión.pedro,78@ern.com",
    "imagen_url": null,
    "line_manager": 1,
    "aspiring_role": 1,
    "role_assigned_date": "2025-04-27",
    "created_at": "2024-01-06T12:15:26Z",
    "updated_at": "2025-09-09T01:35:06Z",
    "cv_url": null,
    "access_type": "User",
    "role_history": [],
    "dedication": 66
  },
  {
    "id": 79,
    "full_name": "Blanca Clavero, Gibert",
    "das": "A00079",
    "project": "GLOBAL TECH",
    "email": "blanca.clavero,79@ern.com",
    "imagen_url": null,
    "line_manager": 1,
    "aspiring_role": 1,
    "role_assigned_date": "2025-07-16",
    "created_at": "2024-11-11T21:23:21Z",
    "updated_at": "2025-02-01T04:37:22Z",
    "cv_url": null,
    "access_type": "User",
    "role_history": [],
    "dedication": 54
  },
  {
    "id": 80,
    "full_name": "Nidia Oliveras, Garrido",
    "das": "A00080",
    "project": "PROJECT X",
    "email": "nidia.oliveras,80@ern.com",
    "imagen_url": null,
    "line_manager": 531,
    "aspiring_role": 2,
    "role_assigned_date": "2025-06-04",
    "created_at": "2024-07-12T10:37:23Z",
    "updated_at": "2025-05-20T20:52:24Z",
    "cv_url": null,
    "access_type": "User",
    "role_history": [],
    "dedication": 56
  },
  {
    "id": 81,
    "full_name": "Armida Guzman, Salvà",
    "das": "A00081",
    "project": "PROJECT X",
    "email": "armida.guzman,81@ern.com",
    "imagen_url": null,
    "line_manager": 531,
    "aspiring_role": 2,
    "role_assigned_date": "2025-07-30",
    "created_at": "2024-07-21T11:23:07Z",
    "updated_at": "2025-04-04T08:13:00Z",
    "cv_url": null,
    "access_type": "Mentor",
    "role_history": [],
    "dedication": 54
  },
  {
    "id": 82,
    "full_name": "Esteban Hernández, Jimenez",
    "das": "A00082",
    "project": "GLOBAL TECH",
    "email": "esteban.hernández,82@ern.com",
    "imagen_url": null,
    "line_manager": 25,
    "aspiring_role": 2,
    "role_assigned_date": "2025-01-24",
    "created_at": "2024-02-12T10:29:24Z",
    "updated_at": "2024-12-23T14:12:22Z",
    "cv_url": null,
    "access_type": "Admin",
    "role_history": [],
    "dedication": 82
  },
  {
    "id": 83,
    "full_name": "Ángeles Manso, Barral",
    "das": "A00083",
    "project": "PROJECT X",
    "email": "ángeles.manso,83@ern.com",
    "imagen_url": null,
    "line_manager": 96,
    "aspiring_role": 1,
    "role_assigned_date": "2025-03-02",
    "created_at": "2024-03-26T14:10:34Z",
    "updated_at": "2024-12-06T09:00:25Z",
    "cv_url": null,
    "access_type": "Admin",
    "role_history": [],
    "dedication": 77
  },
  {
    "id": 84,
    "full_name": "Julián Ropero, Ramón",
    "das": "A00084",
    "project": "ACME EXTREME",
    "email": "julián.ropero,84@ern.com",
    "imagen_url": null,
    "line_manager": 531,
    "aspiring_role": 4,
    "role_assigned_date": "2025-11-23",
    "created_at": "2023-12-21T17:07:02Z",
    "updated_at": "2025-05-11T23:11:35Z",
    "cv_url": null,
    "access_type": "Mentor",
    "role_history": [],
    "dedication": 75
  },
  {
    "id": 85,
    "full_name": "Adora Mascaró, Leiva",
    "das": "A00085",
    "project": "GLOBAL TECH",
    "email": "adora.mascaró,85@ern.com",
    "imagen_url": null,
    "line_manager": 25,
    "aspiring_role": 2,
    "role_assigned_date": "2025-03-02",
    "created_at": "2023-12-14T01:31:04Z",
    "updated_at": "2025-02-26T04:02:20Z",
    "cv_url": null,
    "access_type": "User",
    "role_history": [],
    "dedication": 62
  },
  {
    "id": 86,
    "full_name": "Ovidio Granados, Ojeda",
    "das": "A00086",
    "project": "PROJECT X",
    "email": "ovidio.granados,86@ern.com",
    "imagen_url": null,
    "line_manager": 25,
    "aspiring_role": 3,
    "role_assigned_date": "2025-02-18",
    "created_at": "2024-09-02T07:23:34Z",
    "updated_at": "2025-08-24T15:35:21Z",
    "cv_url": null,
    "access_type": "Mentor",
    "role_history": [],
    "dedication": 90
  },
  {
    "id": 87,
    "full_name": "Javiera Falcón, Alonso",
    "das": "A00087",
    "project": "GLOBAL TECH",
    "email": "javiera.falcón,87@ern.com",
    "imagen_url": null,
    "line_manager": 12,
    "aspiring_role": 2,
    "role_assigned_date": "2025-06-22",
    "created_at": "2024-08-30T04:31:57Z",
    "updated_at": "2025-08-10T13:48:24Z",
    "cv_url": null,
    "access_type": "Mentor",
    "role_history": [],
    "dedication": 77
  },
  {
    "id": 88,
    "full_name": "Emma Peralta, Gallardo",
    "das": "A00088",
    "project": "PROJECT X",
    "email": "emma.peralta,88@ern.com",
    "imagen_url": null,
    "line_manager": 12,
    "aspiring_role": 2,
    "role_assigned_date": "2025-05-14",
    "created_at": "2023-12-15T08:03:35Z",
    "updated_at": "2025-04-06T18:35:40Z",
    "cv_url": null,
    "access_type": "Mentor",
    "role_history": [],
    "dedication": 86
  },
  {
    "id": 89,
    "full_name": "Leonardo Benavent, Barral",
    "das": "A00089",
    "project": "PROJECT X",
    "email": "leonardo.benavent,89@ern.com",
    "imagen_url": null,
    "line_manager": 96,
    "aspiring_role": 3,
    "role_assigned_date": "2025-10-20",
    "created_at": "2024-02-05T22:07:19Z",
    "updated_at": "2024-12-06T22:14:35Z",
    "cv_url": null,
    "access_type": "User",
    "role_history": [],
    "dedication": 75
  },
  {
    "id": 90,
    "full_name": "Andrés Felipe Pizarro, Belmonte",
    "das": "A00090",
    "project": "PROJECT X",
    "email": "andrés.felipe90@ern.com",
    "imagen_url": null,
    "line_manager": 25,
    "aspiring_role": 3,
    "role_assigned_date": "2025-02-06",
    "created_at": "2024-07-20T05:37:58Z",
    "updated_at": "2025-09-28T23:02:47Z",
    "cv_url": null,
    "access_type": "Admin",
    "role_history": [],
    "dedication": 96
  },
  {
    "id": 91,
    "full_name": "Teodosio Barrera, Montero",
    "das": "A00091",
    "project": "GLOBAL TECH",
    "email": "teodosio.barrera,91@ern.com",
    "imagen_url": null,
    "line_manager": 25,
    "aspiring_role": 2,
    "role_assigned_date": "2025-01-17",
    "created_at": "2024-11-12T19:15:52Z",
    "updated_at": "2025-06-14T10:44:40Z",
    "cv_url": null,
    "access_type": "Mentor",
    "role_history": [],
    "dedication": 55
  },
  {
    "id": 92,
    "full_name": "Ofelia Aramburu, Lago",
    "das": "A00092",
    "project": "PROJECT X",
    "email": "ofelia.aramburu,92@ern.com",
    "imagen_url": null,
    "line_manager": 33,
    "aspiring_role": 5,
    "role_assigned_date": "2025-07-18",
    "created_at": "2024-10-07T15:48:51Z",
    "updated_at": "2025-02-22T10:08:10Z",
    "cv_url": null,
    "access_type": "User",
    "role_history": [],
    "dedication": 75
  },
  {
    "id": 93,
    "full_name": "Ramiro Novoa, Gual",
    "das": "A00093",
    "project": "ACME EXTREME",
    "email": "ramiro.novoa,93@ern.com",
    "imagen_url": null,
    "line_manager": 96,
    "aspiring_role": 1,
    "role_assigned_date": "2025-01-30",
    "created_at": "2024-07-29T06:44:03Z",
    "updated_at": "2025-06-06T01:26:37Z",
    "cv_url": null,
    "access_type": "Admin",
    "role_history": [],
    "dedication": 83
  },
  {
    "id": 94,
    "full_name": "Pánfilo Amorós, Gomez",
    "das": "A00094",
    "project": "INNOVATE LAB",
    "email": "pánfilo.amorós,94@ern.com",
    "imagen_url": null,
    "line_manager": 1,
    "aspiring_role": 2,
    "role_assigned_date": "2025-03-05",
    "created_at": "2024-07-07T22:37:16Z",
    "updated_at": "2025-07-28T06:45:44Z",
    "cv_url": null,
    "access_type": "Mentor",
    "role_history": [],
    "dedication": 88
  },
  {
    "id": 95,
    "full_name": "Edgardo Larrañaga, Manzanares",
    "das": "A00095",
    "project": "INNOVATE LAB",
    "email": "edgardo.larrañaga,95@ern.com",
    "imagen_url": null,
    "line_manager": 96,
    "aspiring_role": 2,
    "role_assigned_date": "2025-01-31",
    "created_at": "2024-08-02T07:47:23Z",
    "updated_at": "2025-09-22T15:12:35Z",
    "cv_url": null,
    "access_type": "Admin",
    "role_history": [],
    "dedication": 81
  },
  {
    "id": 96,
    "full_name": "María Dolores Molins, Sarmiento",
    "das": "A00096",
    "project": "GLOBAL TECH",
    "email": "maría.dolores96@ern.com",
    "imagen_url": null,
    "line_manager": 12,
    "aspiring_role": 4,
    "role_assigned_date": "2025-06-17",
    "created_at": "2024-01-03T02:32:29Z",
    "updated_at": "2025-02-18T15:06:35Z",
    "cv_url": null,
    "access_type": "User",
    "role_history": [],
    "dedication": 66
  },
  {
    "id": 97,
    "full_name": "Baldomero Blanca, Vera",
    "das": "A00097",
    "project": "INNOVATE LAB",
    "email": "baldomero.blanca,97@ern.com",
    "imagen_url": null,
    "line_manager": 96,
    "aspiring_role": 3,
    "role_assigned_date": "2025-05-02",
    "created_at": "2024-01-18T02:31:21Z",
    "updated_at": "2025-01-23T20:54:06Z",
    "cv_url": null,
    "access_type": "Admin",
    "role_history": [],
    "dedication": 86
  },
  {
    "id": 98,
    "full_name": "Victor Manuel Fortuny, Lorenzo",
    "das": "A00098",
    "project": "GLOBAL TECH",
    "email": "victor.manuel98@ern.com",
    "imagen_url": null,
    "line_manager": 531,
    "aspiring_role": 3,
    "role_assigned_date": "2025-06-20",
    "created_at": "2024-10-13T03:11:22Z",
    "updated_at": "2025-03-17T09:56:58Z",
    "cv_url": null,
    "access_type": "Mentor",
    "role_history": [],
    "dedication": 89
  },
  {
    "id": 99,
    "full_name": "Heliodoro Trillo, Amigó",
    "das": "A00099",
    "project": "INNOVATE LAB",
    "email": "heliodoro.trillo,99@ern.com",
    "imagen_url": null,
    "line_manager": 12,
    "aspiring_role": 3,
    "role_assigned_date": "2024-12-29",
    "created_at": "2024-11-02T16:39:58Z",
    "updated_at": "2025-04-16T17:56:00Z",
    "cv_url": null,
    "access_type": "Mentor",
    "role_history": [],
    "dedication": 82
  },
  {
    "id": 100,
    "full_name": "Georgina Márquez, Barros",
    "das": "A00100",
    "project": "GLOBAL TECH",
    "email": "georgina.márquez,100@ern.com",
    "imagen_url": null,
    "line_manager": 96,
    "aspiring_role": 5,
    "role_assigned_date": "2025-08-14",
    "created_at": "2024-01-31T07:01:30Z",
    "updated_at": "2025-02-12T14:47:56Z",
    "cv_url": null,
    "access_type": "User",
    "role_history": [],
    "dedication": 55
  }
];

const mockProjects: string[] = [
  "49484002",
  "55555",
  "6666",
  "A",
  "aa",
  "AA",
  "acme",
  "ACME",
  "ACME EXTREME",
  "ALG",
  "B",
  "Bar castilla",
  "bob",
  "C",
  "cero",
  "cuatrouno",
  "D",
  "Euskaltel",
  "Indefinido",
  "mapfre",
  "Mapfre",
  "Mapfre2",
  "PPP",
  "proyecto1",
  "proyecto prueba1",
  "proyecto prueba prueba",
  "prueba 1022",
  "prueba 103",
  "prueba 104",
  "prueba 105",
  "prueba 106",
  "prueba1101",
  "prueba 111111",
  "prueba2",
  "prueba22222",
  "prueba 301",
  "prueba 302",
  "prueba 317",
  "prueba 318",
  "prueba 320",
  "prueba 324",
  "prueba 401",
  "prueba 403",
  "prueba 406",
  "prueba 407",
  "prueba 409",
  "prueba 410",
  "prueba411",
  "prueba412",
  "prueba413",
  "prueba414",
  "prueba415",
  "prueba416",
  "prueba417",
  "prueba418",
  "prueba 484",
  "prueba501",
  "prueba502",
  "prueba504",
  "prueba505",
  "prueba506",
  "prueba507",
  "prueba601",
  "prueba607",
  "prueba609",
  "prueba612",
  "prueba614",
  "prueba615",
  "prueba619",
  "prueba621",
  "prueba701",
  "prueba703",
  "prueba704",
  "prueba705",
  "prueba706",
  "prueba707",
  "prueba708",
  "prueba709",
  "prueba710",
  "prueba711",
  "prueba712",
  "prueba713",
  "prueba714",
  "prueba715",
  "prueba716",
  "prueba717",
  "prueba718",
  "prueba724",
  "prueba725",
  "prueba726",
  "prueba728",
  "prueba729",
  "prueba730",
  "prueba731",
  "prueba732",
  "prueba734",
  "prueba801",
  "prueba802",
  "prueba803",
  "prueba901",
  "prueba f0",
  "prueba f1",
  "prueba f12",
  "prueba f2",
  "prueba f22",
  "prueba f23",
  "prueba f26",
  "prueba f4",
  "prueba f5334",
  "prueba f53343",
  "prueba f6",
  "prueba f73",
  "prueba f8",
  "prueba fd",
  "prueba prueba",
  "pruebaprueba503",
  "rrr",
  "string",
  "unocinco",
  "unocuatro",
  "unoseis",
  "unotres",
  "unouno"
];

const mockRoles: Role[] = [
  {
    "id": 2,
    "name": {
      "EN": "string33311a11",
      "ES": "actualizado desde la web"
    },
    "description": {
      "EN": "string",
      "ES": "string"
    },
    "functions": {
      "EN": [
        "Design and implement integration solutions between various systems and platforms.",
        "Develop and maintain APIs for system integration.",
        "Ensure smooth communication between different software systems.",
        "Troubleshoot and resolve integration issues.",
        "Collaborate with development teams to integrate new functionalities."
      ],
      "ES": [
        "Diseñar e implementar soluciones de integración entre varios sistemas y plataformas.",
        "Desarrollar y mantener APIs para la integración de sistemas.",
        "Asegurar una comunicación fluida entre diferentes sistemas de software.",
        "Solucionar problemas y resolver problemas de integración.",
        "Colaborar con los equipos de desarrollo para integrar nuevas funcionalidades."
      ]
    },
    "tags": [
      {
        "id": 3,
        "name": "string",
        "category": "Tool",
        "level": "Beginner"
      },
      {
        "id": 63,
        "name": "Accessibility",
        "category": "Cross Functional",
        "level": "Advanced"
      }
    ],
    "is_blocked": false
  },
  {
    "id": 10,
    "name": {
      "EN": "Functional Analyst.",
      "ES": "Analista Funcional."
    },
    "description": {
      "EN": "A Functional Analyst focuses on understanding business requirements and translating them into technical specifications. They work with stakeholders and development teams to ensure that software solutions meet business needs.",
      "ES": "Un Analista Funcional se enfoca en comprender los requisitos del negocio y traducirlos en especificaciones técnicas. Trabajan con las partes interesadas y los equipos de desarrollo para asegurar que las soluciones de software cumplan con las necesidades del negocio."
    },
    "functions": {
      "EN": [
        "Gather and analyze business requirements from stakeholders.",
        "Translate business needs into technical specifications for development teams.",
        "Document and prioritize functional requirements for software projects.",
        "Collaborate with developers and testers to ensure software meets business needs.",
        "Conduct user acceptance testing to verify that the solution meets requirements."
      ],
      "ES": [
        "Recoger y analizar los requisitos del negocio de las partes interesadas.",
        "Traducir las necesidades del negocio en especificaciones técnicas para los equipos de desarrollo.",
        "Documentar y priorizar los requisitos funcionales para proyectos de software.",
        "Colaborar con desarrolladores y testers para asegurar que el software cumpla con las necesidades del negocio.",
        "Realizar pruebas de aceptación de usuario para verificar que la solución cumpla con los requisitos."
      ]
    },
    "tags": [],
    "is_blocked": false
  },
  {
    "id": 5,
    "name": {
      "EN": "AI Developer.",
      "ES": "Desarrollador AI."
    },
    "description": {
      "EN": "An AI Developer focuses on creating applications and systems that use machine learning, deep learning, and other AI techniques. They work with tools like TensorFlow, PyTorch, and data to build intelligent systems.",
      "ES": "Un Desarrollador AI se enfoca en crear aplicaciones y sistemas que utilizan aprendizaje automático, aprendizaje profundo y otras técnicas de IA. Trabajan con herramientas como TensorFlow, PyTorch y datos para construir sistemas inteligentes."
    },
    "functions": {
      "EN": [
        "Develop and deploy machine learning models and AI algorithms.",
        "Analyze and preprocess large datasets to train AI models.",
        "Work with frameworks like TensorFlow, PyTorch, and others to implement AI solutions.",
        "Optimize the performance of AI models and algorithms.",
        "Collaborate with data scientists and engineers to enhance AI applications."
      ],
      "ES": [
        "Desarrollar y desplegar modelos de aprendizaje automático y algoritmos de IA.",
        "Analizar y preprocesar grandes conjuntos de datos para entrenar modelos de IA.",
        "Trabajar con frameworks como TensorFlow, PyTorch y otros para implementar soluciones de IA.",
        "Optimizar el rendimiento de modelos y algoritmos de IA.",
        "Colaborar con científicos de datos e ingenieros para mejorar aplicaciones de IA."
      ]
    },
    "tags": [],
    "is_blocked": false
  },
  {
    "id": 4,
    "name": {
      "EN": "Backend Developer.",
      "ES": "Desarrollador Backend."
    },
    "description": {
      "EN": "A Backend Developer is responsible for server-side development, databases, and application logic. They work with server technologies like Node.js, Java, Python, and manage databases such as MySQL, PostgreSQL, or MongoDB.",
      "ES": "Un Desarrollador Backend es responsable del desarrollo del lado del servidor, bases de datos y la lógica de la aplicación. Trabajan con tecnologías de servidor como Node.js, Java, Python y gestionan bases de datos como MySQL, PostgreSQL o MongoDB."
    },
    "functions": {
      "EN": [
        "Develop and maintain server-side logic, databases, and APIs.",
        "Ensure high performance and responsiveness of applications.",
        "Design and optimize database structures and queries.",
        "Implement security and data protection measures.",
        "Collaborate with frontend developers to integrate user-facing elements."
      ],
      "ES": [
        "Desarrollar y mantener la lógica del lado del servidor, bases de datos y APIs.",
        "Asegurar un alto rendimiento y capacidad de respuesta de las aplicaciones.",
        "Diseñar y optimizar las estructuras y consultas de bases de datos.",
        "Implementar medidas de seguridad y protección de datos.",
        "Colaborar con los desarrolladores frontend para integrar los elementos visibles para el usuario."
      ]
    },
    "tags": [
      {
        "id": 142,
        "name": "AWS",
        "category": "Platform",
        "level": "Beginner"
      },
      {
        "id": 146,
        "name": "Azure",
        "category": "Platform",
        "level": "Intermediate"
      },
      {
        "id": 187,
        "name": "Azure DevOps",
        "category": "Tool",
        "level": "Beginner"
      },
      {
        "id": 416,
        "name": "Continuous Integration",
        "category": "Cross Functional",
        "level": "Intermediate"
      },
      {
        "id": 463,
        "name": "Docker",
        "category": "Tool",
        "level": "Beginner"
      },
      {
        "id": 586,
        "name": "Github",
        "category": "Product",
        "level": "Beginner"
      },
      {
        "id": 707,
        "name": "Java",
        "category": "Programming Language",
        "level": "Intermediate"
      },
      {
        "id": 749,
        "name": "Java EE",
        "category": "Platform",
        "level": "Intermediate"
      },
      {
        "id": 842,
        "name": "Javascript",
        "category": "Programming Language",
        "level": "Intermediate"
      },
      {
        "id": 994,
        "name": "Node.js",
        "category": "Platform",
        "level": "Beginner"
      },
      {
        "id": 1009,
        "name": "OpenAI GPT",
        "category": "Technical",
        "level": "Beginner"
      },
      {
        "id": 1147,
        "name": "Rest",
        "category": "Protocol",
        "level": "Beginner"
      },
      {
        "id": 1198,
        "name": "Scrum",
        "category": "Method",
        "level": "Beginner"
      },
      {
        "id": 1228,
        "name": "Soap",
        "category": "Protocol",
        "level": "Beginner"
      },
      {
        "id": 1246,
        "name": "Spring Boot",
        "category": "Framework",
        "level": "Beginner"
      },
      {
        "id": 1342,
        "name": "TypeScript",
        "category": "Programming Language",
        "level": "Beginner"
      },
      {
        "id": 1456,
        "name": "Microservicios",
        "category": "Tool",
        "level": "Beginner"
      }
    ],
    "is_blocked": false
  },
  {
    "id": 3,
    "name": {
      "EN": "Integration Developer.",
      "ES": "Desarrollador de Integración."
    },
    "description": {
      "EN": "An Integration Developer focuses on ensuring that different software systems and applications communicate with each other effectively. They work with APIs, middleware, and data pipelines to integrate systems.",
      "ES": "Un Desarrollador de Integración se enfoca en garantizar que diferentes sistemas de software y aplicaciones se comuniquen entre sí de manera efectiva. Trabajan con APIs, middleware y flujos de datos para integrar sistemas."
    },
    "functions": {
      "EN": [
        "Design and implement integration solutions between various systems and platforms.",
        "Develop and maintain APIs for system integration.",
        "Ensure smooth communication between different software systems.",
        "Troubleshoot and resolve integration issues.",
        "Collaborate with development teams to integrate new functionalities."
      ],
      "ES": [
        "Diseñar e implementar soluciones de integración entre varios sistemas y plataformas.",
        "Desarrollar y mantener APIs para la integración de sistemas.",
        "Asegurar una comunicación fluida entre diferentes sistemas de software.",
        "Solucionar problemas y resolver problemas de integración.",
        "Colaborar con los equipos de desarrollo para integrar nuevas funcionalidades."
      ]
    },
    "tags": [
      {
        "id": 15,
        "name": "Python",
        "category": "Tool",
        "level": "Beginner"
      }
    ],
    "is_blocked": false
  },
  {
    "id": 5,
    "name": {
      "EN": "UX/UI Designer",
      "ES": "Diseñador UX/UI"
    },
    "description": {
      "EN": "A UX/UI Designer is responsible for creating digital experiences that are intuitive, accessible, and visually appealing for users. Their work combines user research, information architecture, interface design, and prototyping. They collaborate closely with development and business teams to ensure digital solutions meet both user needs and product goals.",
      "ES": "Un Diseñador UX/UI es responsable de crear experiencias digitales que sean intuitivas, accesibles y atractivas para los usuarios. Su trabajo combina investigación sobre el comportamiento de los usuarios, arquitectura de la información, diseño de interfaces y prototipado. Colabora estrechamente con equipos de desarrollo y negocio para asegurar que las soluciones digitales respondan tanto a las necesidades del usuario como a los objetivos del producto."
    },
    "functions": {
      "EN": [
        "Conduct user research to identify needs, behaviors, and pain points.",
        "Design wireframes, interactive prototypes, and user flows.",
        "Create visual interfaces consistent with brand identity and usability principles."
      ],
      "ES": [
        "Realizar investigaciones de usuario para identificar necesidades, comportamientos y puntos de fricción.",
        "Diseñar wireframes, prototipos interactivos y flujos de usuario.",
        "Crear interfaces visuales coherentes con la identidad de marca y principios de usabilidad."
      ]
    },
    "tags": [],
    "is_blocked": false
  },
  {
    "id": 15,
    "name": {
      "EN": "Data Enginee233r.",
      "ES": "Ingeniero de Dato23s."
    },
    "description": {
      "EN": "Data Enginee2r.",
      "ES": "Ingeniero de Dato2s."
    },
    "functions": { "EN": [], "ES": [] },
    "tags": [
      {
        "id": 7,
        "name": "string223223",
        "category": "Tool",
        "level": "Beginner"
      }
    ],
    "is_blocked": false
  },
  {
    "id": 14,
    "name": {
      "EN": "Data Enginee2r.",
      "ES": "Ingeniero de Dato2s."
    },
    "description": {
      "EN": "Data Enginee2r.",
      "ES": "Ingeniero de Dato2s."
    },
    "functions": {
      "EN": ["PLACEHOLDER."],
      "ES": ["PLACEHOLDER"]
    },
    "tags": [
      {
        "id": 4,
        "name": "string22",
        "category": "Tool",
        "level": "Beginner"
      }
    ],
    "is_blocked": false
  },
  {
    "id": 11,
    "name": {
      "EN": "Data Engineer.",
      "ES": "Ingeniero de Datos."
    },
    "description": {
      "EN": "A Data Engineer is responsible for designing, building, and maintaining the infrastructure that allows for the collection, storage, and analysis of large amounts of data. They work with databases, ETL processes, and data pipelines.",
      "ES": "Un Ingeniero de Datos es responsable de diseñar, construir y mantener la infraestructura que permite la recolección, almacenamiento y análisis de grandes cantidades de datos. Trabajan con bases de datos, procesos ETL y flujos de datos."
    },
    "functions": {
      "EN": [
        "Design, build, and maintain data architectures and pipelines.",
        "Optimize and manage databases and data warehouses.",
        "Ensure data is accessible and accurate for analysis.",
        "Develop and implement ETL (Extract, Transform, Load) processes.",
        "Work with data scientists and analysts to support data-driven decision-making."
      ],
      "ES": [
        "Diseñar, construir y mantener arquitecturas y flujos de datos.",
        "Optimizar y gestionar bases de datos y almacenes de datos.",
        "Asegurar que los datos sean accesibles y precisos para el análisis.",
        "Desarrollar e implementar procesos ETL (Extracción, Transformación, Carga).",
        "Trabajar con científicos de datos y analistas para apoyar la toma de decisiones basada en datos."
      ]
    },
    "tags": [],
    "is_blocked": false
  },
  {
    "id": 16,
    "name": {
      "EN": "Data Enginer Test.",
      "ES": "Ingeniero de Datos  Test."
    },
    "description": {
      "EN": "Data Engineer  Test.",
      "ES": "Ingeniero de Datos  Test."
    },
    "functions": { "EN": [], "ES": [] },
    "tags": [
      {
        "id": 4,
        "name": "string22",
        "category": "Tool",
        "level": "Beginner"
      }
    ],
    "is_blocked": false
  },
  {
    "id": 17,
    "name": {
      "EN": "Data Enginer Test1.",
      "ES": "Ingeniero de Datos  Test1."
    },
    "description": {
      "EN": "Data Engineer  Test.",
      "ES": "Ingeniero de Datos  Test."
    },
    "functions": { "EN": [], "ES": [] },
    "tags": [
      {
        "id": 4,
        "name": "string22",
        "category": "Tool",
        "level": "Beginner"
      }
    ],
    "is_blocked": false
  },
  {
    "id": 18,
    "name": {
      "EN": "Data Enginer Test11.",
      "ES": "Ingeniero de Datos  Test11."
    },
    "description": {
      "EN": "Data Engineer  Test.",
      "ES": "Ingeniero de Datos  Test."
    },
    "functions": { "EN": [], "ES": [] },
    "tags": [
      {
        "id": 4,
        "name": "string22",
        "category": "Tool",
        "level": "Beginner"
      }
    ],
    "is_blocked": false
  },
  {
    "id": 19,
    "name": {
      "EN": "Data Enginer Test21.",
      "ES": "Ingeniero de Datos  Test21."
    },
    "description": {
      "EN": "Data Engineer  Test.",
      "ES": "Ingeniero de Datos  Test."
    },
    "functions": { "EN": [], "ES": [] },
    "tags": [
      {
        "id": 4,
        "name": "string22",
        "category": "Tool",
        "level": "Beginner"
      }
    ],
    "is_blocked": false
  },
  {
    "id": 20,
    "name": {
      "EN": "Data Enginer Test Put22.",
      "ES": "Ingeniero de Datos  Test Put."
    },
    "description": {
      "EN": "Data Engineer  Test.",
      "ES": "Ingeniero de Datos  Test."
    },
    "functions": {
      "EN": [],
      "ES": [
        "b"
      ]
    },
    "tags": [
      {
        "id": 2,
        "name": "strin3g",
        "category": "Tool",
        "level": "Beginner"
      },
      {
        "id": 4,
        "name": "string22",
        "category": "Tool",
        "level": "Beginner"
      },
      {
        "id": 6,
        "name": "string4444",
        "category": "Tool",
        "level": "Beginner"
      }
    ],
    "is_blocked": false
  },
  {
    "id": 6,
    "name": {
      "EN": "Platform Engineer.",
      "ES": "Ingeniero de Plataforma."
    },
    "description": {
      "EN": "A Platform Engineer is responsible for designing, building, and maintaining the infrastructure that supports software applications. They work with cloud platforms, automation tools, and system monitoring to ensure reliability, scalability, and performance of the platform.",
      "ES": "Un Ingeniero de Plataforma es responsable de diseñar, construir y mantener la infraestructura que soporta las aplicaciones de software. Trabajan con plataformas en la nube, herramientas de automatización y monitoreo de sistemas para asegurar la fiabilidad, escalabilidad y rendimiento de la plataforma."
    },
    "functions": {
      "EN": [
        "Design, build, and maintain infrastructure that supports software applications.",
        "Work with cloud platforms and automation tools to optimize deployment and scalability.",
        "Monitor and ensure the reliability and performance of the platform.",
        "Collaborate with development and operations teams to streamline the development lifecycle.",
        "Troubleshoot and resolve infrastructure-related issues to ensure uptime and performance."
      ],
      "ES": [
        "Diseñar, construir y mantener la infraestructura que soporta las aplicaciones de software.",
        "Trabajar con plataformas en la nube y herramientas de automatización para optimizar el despliegue y la escalabilidad.",
        "Monitorear y asegurar la fiabilidad y el rendimiento de la plataforma.",
        "Colaborar con los equipos de desarrollo y operaciones para agilizar el ciclo de vida del desarrollo.",
        "Solucionar problemas y resolver incidencias relacionadas con la infraestructura para asegurar el tiempo de actividad y el rendimiento."
      ]
    },
    "tags": [],
    "is_blocked": false
  },
  {
    "id": 31,
    "name": {
      "EN": "Nuevo RoL Test",
      "ES": "Nuevo RoL Test"
    },
    "description": {
      "EN": "Nuevo RoL Test",
      "ES": "Nuevo RoL Test"
    },
    "functions": {
      "EN": [],
      "ES": []
    },
    "tags": [],
    "is_blocked": false
  },
  {
    "id": 36,
    "name": {
      "EN": "Prueba 28/7 1",
      "ES": "Prueba 28/7 1"
    },
    "description": {
      "EN": "Prueba 28/7 1",
      "ES": "Prueba 28/7 1"
    },
    "functions": {
      "EN": [],
      "ES": []
    },
    "tags": [],
    "is_blocked": false
  },
  {
    "id": 34,
    "name": {
      "EN": "Prueba crear servicios 2",
      "ES": "Prueba crear servicios"
    },
    "description": {
      "EN": "Prueba crear servicios",
      "ES": "Prueba crear servicios"
    },
    "functions": {
      "EN": [],
      "ES": [
        "Prueba crear servicios"
      ]
    },
    "tags": [
      {
        "id": 6,
        "name": "string4444",
        "category": "Tool",
        "level": "Beginner"
      }
    ],
    "is_blocked": false
  },
  {
    "id": 41,
    "name": {
      "EN": "prueba rol pdm",
      "ES": "prueba rol pdm"
    },
    "description": {
      "EN": "prueba rol pdm",
      "ES": "prueba rol pdm"
    },
    "functions": {
      "EN": [
        "funcion 1"
      ],
      "ES": [
        "funcion 1"
      ]
    },
    "tags": [
      {
        "id": 2,
        "name": "strin3g",
        "category": "Tool",
        "level": "Beginner"
      }
    ],
    "is_blocked": false
  },
  {
    "id": 47,
    "name": {
      "EN": "prueba rol servicios4 ingles",
      "ES": "prueba rol servicios4"
    },
    "description": {
      "EN": "english rol servicios4",
      "ES": "prueba rol servicios4"
    },
    "functions": {
      "EN": [],
      "ES": [
        "función1",
        "función2"
      ]
    },
    "tags": [
      {
        "id": 2,
        "name": "strin3g",
        "category": "Tool",
        "level": "Beginner"
      },
      {
        "id": 12815,
        "name": "prueba tag servicios5",
        "category": "Norms and Standards",
        "level": "Intermediate"
      }
    ],
    "is_blocked": false
  },
  {
    "id": 8,
    "name": {
      "EN": "QA Tester.",
      "ES": "QA Tester."
    },
    "description": {
      "EN": "A QA Tester ensures the quality of software by testing its functionality, performance, and security. They use manual and automated testing techniques to identify and report bugs and issues.",
      "ES": "Un QA Tester asegura la calidad del software mediante pruebas de su funcionalidad, rendimiento y seguridad. Utilizan técnicas de pruebas manuales y automatizadas para identificar y reportar errores e incidencias."
    },
    "functions": {
      "EN": [
        "Design and execute manual and automated tests to ensure software quality.",
        "Identify and document bugs and issues in the software.",
        "Collaborate with development teams to fix and resolve defects.",
        "Develop and maintain testing frameworks and scripts.",
        "Ensure that the software meets all functional and performance requirements."
      ],
      "ES": [
        "Diseñar y ejecutar pruebas manuales y automatizadas para asegurar la calidad del software.",
        "Identificar y documentar errores e incidencias en el software.",
        "Colaborar con los equipos de desarrollo para corregir y resolver defectos.",
        "Desarrollar y mantener frameworks y scripts de pruebas.",
        "Asegurar que el software cumpla con todos los requisitos funcionales y de rendimiento."
      ]
    },
    "tags": [],
    "is_blocked": false
  },
  {
    "id": 22,
    "name": {
      "EN": "QA Tester Test.",
      "ES": "QA Tester Test."
    },
    "description": {
      "EN": "A QA Tester ensures the quality of software by testing its functionality, performance, and security. They use manual and automated testing techniques to identify and report bugs and issues.",
      "ES": "Un QA Tester asegura la calidad del software mediante pruebas de su funcionalidad, rendimiento y seguridad. Utilizan técnicas de pruebas manuales y automatizadas para identificar y reportar errores e incidencias."
    },
    "functions": {
      "EN": [
        "Design and execute manual and automated tests to ensure software quality.",
        "Identify and document bugs and issues in the software.",
        "Collaborate with development teams to fix and resolve defects.",
        "Develop and maintain testing frameworks and scripts.",
        "Ensure that the software meets all functional and performance requirements."
      ],
      "ES": [
        "Diseñar y ejecutar pruebas manuales y automatizadas para asegurar la calidad del software.",
        "Identificar y documentar errores e incidencias en el software.",
        "Colaborar con los equipos de desarrollo para corregir y resolver defectos.",
        "Desarrollar y mantener frameworks y scripts de pruebas.",
        "Asegurar que el software cumpla con todos los requisitos funcionales y de rendimiento."
      ]
    },
    "tags": [
      {
        "id": 16,
        "name": "Test QA",
        "category": "Tool",
        "level": "Beginner"
      }
    ],
    "is_blocked": false
  },
  {
    "id": 27,
    "name": {
      "EN": "Role de prueba en web 2",
      "ES": "Role de prueba en web 2"
    },
    "description": {
      "EN": "Role de prueba en web 2",
      "ES": "Role de prueba en web 2"
    },
    "functions": {
      "EN": [],
      "ES": []
    },
    "tags": [],
    "is_blocked": false
  },
  {
    "id": 42,
    "name": {
      "EN": "rol prueba 1",
      "ES": "rol prueba 1"
    },
    "description": {
      "EN": "rol prueba 1",
      "ES": "rol prueba 1"
    },
    "functions": {
      "EN": [],
      "ES": []
    },
    "tags": [],
    "is_blocked": false
  },
  {
    "id": 48,
    "name": {
      "EN": "test rol OGR 28/10/2025",
      "ES": "rol prueba OGR 28/10/2025"
    },
    "description": {
      "EN": "test rol OGR 28/10/2025",
      "ES": "rol prueba OGR 28/10/2025"
    },
    "functions": {
      "EN": [],
      "ES": []
    },
    "tags": [
      {
        "id": 2,
        "name": "strin3g",
        "category": "Tool",
        "level": "Beginner"
      }
    ],
    "is_blocked": true
  },
  {
    "id": 45,
    "name": {
      "EN": "rol prueba servicio2 inglés",
      "ES": "rol prueba servicio2"
    },
    "description": {
      "EN": "english prueba servicio2",
      "ES": "rol prueba servicio2"
    },
    "functions": {
      "EN": [
        "function 1"
      ],
      "ES": [
        "funcion1",
        "funcion2"
      ]
    },
    "tags": [
      {
        "id": 4,
        "name": "string22",
        "category": "Tool",
        "level": "Beginner"
      },
      {
        "id": 7,
        "name": "string223223",
        "category": "Tool",
        "level": "Beginner"
      }
    ],
    "is_blocked": false
  },
  {
    "id": 44,
    "name": {
      "EN": "rol prueba servicios1 ingles",
      "ES": "rol prueba servicios1"
    },
    "description": {
      "EN": "english rol prueba servicios 1",
      "ES": "rol prueba servicios 1"
    },
    "functions": {
      "EN": [],
      "ES": [
        "función 1",
        "funcion 2"
      ]
    },
    "tags": [
      {
        "id": 48,
        "name": "Apple",
        "category": "Protocol",
        "level": "Advanced"
      },
      {
        "id": 12799,
        "name": "nuevo tag prueba1",
        "category": "Protocol",
        "level": "Beginner"
      }
    ],
    "is_blocked": false
  },
  {
    "id": 46,
    "name": {
      "EN": "rol prueba servicios3 inglés",
      "ES": "Rol prueba servicios3"
    },
    "description": {
      "EN": "rol prueba servicios3 english",
      "ES": "prueba servicios3"
    },
    "functions": {
      "EN": [],
      "ES": [
        "función1",
        "función2"
      ]
    },
    "tags": [
      {
        "id": 12809,
        "name": "prueba tag servicios3",
        "category": "Cross Functional",
        "level": "Intermediate"
      }
    ],
    "is_blocked": false
  },
  {
    "id": 9,
    "name": {
      "EN": "Scrum Master.",
      "ES": "Scrum Master."
    },
    "description": {
      "EN": "A Scrum Master facilitates the Scrum framework for Agile development. They help teams follow Scrum practices, remove obstacles, and ensure that the team can work efficiently in iterative cycles.",
      "ES": "Un Scrum Master facilita el marco de trabajo Scrum para el desarrollo Ágil. Ayudan a los equipos a seguir las prácticas de Scrum, eliminan obstáculos y aseguran que el equipo trabaje de manera eficiente en ciclos iterativos."
    },
    "functions": {
      "EN": [
        "Facilitate Scrum ceremonies such as daily standups, sprint planning, and retrospectives.",
        "Ensure the team follows Scrum practices and principles.",
        "Remove obstacles and blockers to help the team maintain productivity.",
        "Coordinate communication between the development team and stakeholders.",
        "Help the team continuously improve their processes and performance."
      ],
      "ES": [
        "Facilitar las ceremonias Scrum como las reuniones diarias, planificación de sprints y retrospectivas.",
        "Asegurar que el equipo siga las prácticas y principios de Scrum.",
        "Eliminar obstáculos y bloqueos para ayudar al equipo a mantener la productividad.",
        "Coordinar la comunicación entre el equipo de desarrollo y las partes interesadas.",
        "Ayudar al equipo a mejorar continuamente sus procesos y rendimiento."
      ]
    },
    "tags": [],
    "is_blocked": false
  },
  {
    "id": 21,
    "name": {
      "EN": "Test empty learningpaths.",
      "ES": "Test empty learningpaths s"
    },
    "description": {
      "EN": "Test empty learningpaths.",
      "ES": "Test empty learningpathsd s"
    },
    "functions": {
      "EN": [],
      "ES": [
        "hjkjhjk"
      ]
    },
    "tags": [
      {
        "id": 9,
        "name": "Training Tag",
        "category": "Tool",
        "level": "Beginner"
      },
      {
        "id": 66,
        "name": "Agile",
        "category": "Method",
        "level": "Advanced"
      }
    ],
    "is_blocked": false
  },
  {
    "id": 28,
    "name": {
      "EN": "test para ver si updated bien",
      "ES": "test para ver si updated bien"
    },
    "description": {
      "EN": "test para ver si updated bien",
      "ES": "test para ver si updated bien"
    },
    "functions": {
      "EN": [],
      "ES": []
    },
    "tags": [],
    "is_blocked": false
  },
  {
    "id": 7,
    "name": {
      "EN": "A Platform Engineer (Security).",
      "ES": "Un Ingeniero de Plataforma (Seguridad)."
    },
    "description": {
      "EN": "A Platform Engineer (Security) focuses on ensuring the security and integrity of the platform's infrastructure. They design and implement security measures, monitor for vulnerabilities, and collaborate with development and operations teams to safeguard the platform from threats.",
      "ES": "Un Ingeniero de Plataforma (Seguridad) se enfoca en garantizar la seguridad e integridad de la infraestructura de la plataforma. Diseñan e implementan medidas de seguridad, monitorean vulnerabilidades y colaboran con los equipos de desarrollo y operaciones para proteger la plataforma contra amenazas."
    },
    "functions": {
      "EN": [
        "Design and implement security measures to protect the platform infrastructure.",
        "Monitor for vulnerabilities and threats, implementing security patches and updates.",
        "Collaborate with development teams to ensure secure coding practices and compliance.",
        "Audit systems and infrastructure to detect and prevent security breaches.",
        "Develop and enforce security policies and procedures to safeguard platform integrity."
      ],
      "ES": [
        "Diseñar e implementar medidas de seguridad para proteger la infraestructura de la plataforma.",
        "Monitorear vulnerabilidades y amenazas, implementando parches y actualizaciones de seguridad.",
        "Colaborar con los equipos de desarrollo para asegurar prácticas de codificación segura y cumplimiento de normativas.",
        "Auditar sistemas e infraestructura para detectar y prevenir brechas de seguridad.",
        "Desarrollar y hacer cumplir políticas y procedimientos de seguridad para proteger la integridad de la plataforma."
      ]
    },
    "tags": [],
    "is_blocked": false
  }
];

const mockLineManagers: User[] = [
  { id: 1, full_name: "[AA] Manager" },
  { id: 2, full_name: "José Ángel, Fernández-Trujillo" },
  { id: 4, full_name: "David Álvaro, Múñoz-Terán" },     
  { id: 5, full_name: "Beatriz Elena, Román-Valverde" }, 
  { id: 12, full_name: "Raúl Óscar, Lamas-Ferrero" },    
  { id: 15, full_name: "Marta Isabel, Prieto-Gómez" },   
  { id: 21, full_name: "Cristóbal Fabián, Suárez-Diez" },
  { id: 33, full_name: "Inés Lucía, Medina-Castro" },    
  { id: 45, full_name: "Diego Manuel, Ibáñez-Real" },    
  { id: 57, full_name: "Raquel Laura, Cañas-Delgado" },  
  { id: 62, full_name: "Arturo Javier, Valle-Inglés" },  
  { id: 78, full_name: "Nuria Belén, Márquez-Pardo" },   
  { id: 84, full_name: "Jordi Iván, Galán-Rodríguez" },  
  { id: 91, full_name: "Félix Alberto, Ramos-Martínez" },
  { id: 96, full_name: "Lucía Andrea, Villar-Olmedo" },  
];


export async function fetchProjects(): Promise<string[] | ErrorStack> {
  await delay(100);
  return mockProjects;
}

export async function fetchRoles(): Promise<Role[] | ErrorStack> {
  await delay(200);
  const fail = Math.random() < 0.05;
  if (fail) return { error: 'Network mock error: failed to load roles.' };
  return mockRoles;
}

export async function fetchLineManagers(): Promise<User[] | ErrorStack> {
  await delay(100);
  return mockLineManagers;
}

export async function fetchUsers(): Promise<{ data: User[] } | ErrorStack> {
  await delay(2000 * Math.random());

  const fail = Math.random() < 0.15;
  if (fail) return { error: 'Network mock error: failed to load users.' };

  return {
    data: mockUsers
  };
}
