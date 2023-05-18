// exclusive admin page - does not need to be fully functional
import { useState } from "react";
import { Container, Card, Button } from "react-bootstrap";

export default function Report() {
  // Initialize an array of profiles in the state - change when backnd is added
  const [profiles, setProfiles] = useState([
    {
      id: 1,
      email: "user1@fdm.co.uk",
      userId: "user1",
      reason: "False advertising",
      banned: false,
    },
    {
      id: 2,
      email: "user2@fdm.co.uk",
      userId: "user2",
      reason: "Spamming",
      banned: false,
    },
    {
      id: 3,
      email: "user3@fdm.co.uk",
      userId: "user3",
      reason: "Unusual number of requests",
      banned: false,
    },
  ]);

  //mark a profile as banned
  const handleMarkAsBanned = (profileId) => {
    // Create a new array of profiles with the updated banned status for that profile
    const updatedProfiles = profiles.map((profile) => {
      if (profile.id === profileId) {
        return { ...profile, banned: true };
      }
      return profile;
    });
    // Update the profiles array in the state with the new array of profiles
    setProfiles(updatedProfiles);
  };

  const handleMarkAsResolved = (profileId) => {
    // Filter out the selected profile from the profiles array to remove it
    const updatedProfiles = profiles.filter(
      (profile) => profile.id !== profileId
    );
    // Update the profiles array in the state with the new array of profiles
    setProfiles(updatedProfiles);
  };

  return (
    <Container style={{ padding: "7rem 0" }}>
      <h1 className="center mb-5">Reported Profiles</h1>
      {profiles.map((profile) => (
        <Card
          key={profile.id}
          className="mx-auto"
          style={{
            width: "70%",
            margin: "0.5rem",
            boxShadow: "0px 0px 20px rgba(10, 10, 10, 0.05)",
          }}
        >
          <Card.Body>
            <Card.Title>{profile.email}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {profile.userId}
            </Card.Subtitle>
            <Card.Text>{profile.reason}</Card.Text>
            {/* Show the "Ban User" button only if the user hasn't already been banned */}
            {!profile.banned && (
              <Button
                variant="danger"
                onClick={() => handleMarkAsBanned(profile.id)}
                style={{ marginRight: "1rem" }}
              >
                Ban User
              </Button>
            )}
            <Button
              variant="success"
              onClick={() => handleMarkAsResolved(profile.id)}
            >
              Issue Resolved
            </Button>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
}
