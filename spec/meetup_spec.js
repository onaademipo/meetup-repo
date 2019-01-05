const request = require("request");
const url = "https://localhost:8000/api/v1/meetups";

const get_meetup = {
    "status": 200,
    "meetups": [
        {
            "id": 1,
            "createdOn": "Saturday, 22nd December, 2018",
            "topic": "This is the new Nigeria.",
            "venue": "Nicon Hilton Hotels, Lagos",
            "happeningOn": "Tuesday January 1, 2019",
            "tags": [
                "Bola",
                "Seun",
                "Temi",
                "Nathan"
            ]
        }
    ]
}

const post_meetup = {
	"location": "",
	"createdOn": "Friday, 30th December, 2018",
    "topic": "This is the new Lagos.",
    "happeningOn": "Thursday January 3, 2019",
    "tags": "Bola,Seun,Temi,Nathan"
};

describe("meetup", () => {
	it ("should return status code 200", (done) => {
		request.get(url, (error, response, body) => {
			expect(response.statusCode).toBe(200);
               done();
		});
	});

	it ("should return the meetups", (done) => {
		request.get(url, (error, response, body) => {
			expect(body).toBe(get_meetups);
            done();
		});
	});

	it ("it should  fail if location is undefined", (done) => {
		request.post(url, post_meetup, (error, response) => {
			expect(post_meetup.location).not.toBeUndefined();
            done();
		});
	});
});