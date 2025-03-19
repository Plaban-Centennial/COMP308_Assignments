// // resolvers.js Code for the resolvers of the GraphQL server
// const Student = require('../models/Student');

// const resolvers = {
//   Query: {
//     students: async () => {
//       try {
//         const students = await Student.find();
//         return students.map((student) => ({
//           id: student._id.toString(), // Convert MongoDB `_id` to GraphQL `id`
//           ...student.toObject(),
//         }));
//       } catch (error) {
//         console.error('Error fetching students:', error);
//         throw new Error('Failed to fetch students');
//       }
//     },
//     student: async (_, { id }) => {
//       try {
//         const student = await Student.findById(id);
//         if (!student) {
//           throw new Error(`Student with ID ${id} not found`);
//         }
//         return {
//           id: student._id.toString(), // Convert MongoDB `_id` to GraphQL `id`
//           ...student.toObject(),
//         };
//       } catch (error) {
//         console.error('Error fetching student by ID:', error);
//         throw new Error('Failed to fetch student');
//       }
//     },
//   },
//   Mutation: {
//     addStudent: async (_, args) => {
//       try {
//         const student = new Student(args);
//         const newStudent = await student.save();
//         return {
//           id: newStudent._id.toString(), // Convert MongoDB `_id` to GraphQL `id`
//           ...newStudent.toObject(),
//         };
//       } catch (error) {
//         console.error('Error adding student:', error);
//         throw new Error('Failed to add student');
//       }
//     },
//     updateStudent: async (_, { id, ...update }) => {
//       try {
//         const updatedStudent = await Student.findByIdAndUpdate(id, update, { new: true });
//         if (!updatedStudent) {
//           throw new Error(`Student with ID ${id} not found`);
//         }
//         return {
//           id: updatedStudent._id.toString(), // Convert MongoDB `_id` to GraphQL `id`
//           ...updatedStudent.toObject(),
//         };
//       } catch (error) {
//         console.error('Error updating student:', error);
//         throw new Error('Failed to update student');
//       }
//     },
//     deleteStudent: async (_, { id }) => {
//       try {
//         const deletedStudent = await Student.findByIdAndDelete(id);
//         if (!deletedStudent) {
//           throw new Error(`Student with ID ${id} not found`);
//         }
//         return {
//           id: deletedStudent._id.toString(), // Convert MongoDB `_id` to GraphQL `id`
//           ...deletedStudent.toObject(),
//         };
//       } catch (error) {
//         console.error('Error deleting student:', error);
//         throw new Error('Failed to delete student');
//       }
//     },
//     deleteStudentByEmail: async (_, { email }) => {
//       try {
//         const deletedStudent = await Student.findOneAndDelete({ email });
//         if (!deletedStudent) {
//           throw new Error(`Student with email ${email} not found`);
//         }
//         return {
//           id: deletedStudent._id.toString(),
//           ...deletedStudent.toObject(),
//         };
//       } catch (error) {
//         console.error('Error deleting student:', error);
//         throw new Error('Failed to delete student');
//       }
//     },

//   },
// };

// module.exports = resolvers;
const User = require('../models/user');
const Player = require('../models/player');
const Tournament = require('../models/tournament');

const resolvers = {
  Query: {
    // Fetch all users
    users: async () => {
      try {
        const users = await User.find();
        return users.map((user) => ({
          id: user._id.toString(),
          ...user.toObject(),
        }));
      } catch (error) {
        console.error('Error fetching users:', error);
        throw new Error('Failed to fetch users');
      }
    },
    // Fetch a single user by ID
    user: async (_, { id }) => {
      try {
        const user = await User.findById(id);
        if (!user) {
          throw new Error(`User with ID ${id} not found`);
        }
        return {
          id: user._id.toString(),
          ...user.toObject(),
        };
      } catch (error) {
        console.error('Error fetching user:', error);
        throw new Error('Failed to fetch user');
      }
    },
    // Fetch all players
    players: async () => {
      try {
        const players = await Player.find().populate('user tournaments');
        return players.map((player) => ({
          id: player._id.toString(),
          ...player.toObject(),
        }));
      } catch (error) {
        console.error('Error fetching players:', error);
        throw new Error('Failed to fetch players');
      }
    },
    // Fetch a single player by ID
    player: async (_, { id }) => {
      try {
        const player = await Player.findById(id).populate('user tournaments');
        if (!player) {
          throw new Error(`Player with ID ${id} not found`);
        }
        return {
          id: player._id.toString(),
          ...player.toObject(),
        };
      } catch (error) {
        console.error('Error fetching player:', error);
        throw new Error('Failed to fetch player');
      }
    },
    // Fetch all tournaments
    tournaments: async () => {
      try {
        const tournaments = await Tournament.find().populate('players');
        return tournaments.map((tournament) => ({
          id: tournament._id.toString(),
          ...tournament.toObject(),
        }));
      } catch (error) {
        console.error('Error fetching tournaments:', error);
        throw new Error('Failed to fetch tournaments');
      }
    },
    // Fetch a single tournament by ID
    tournament: async (_, { id }) => {
      try {
        const tournament = await Tournament.findById(id).populate('players');
        if (!tournament) {
          throw new Error(`Tournament with ID ${id} not found`);
        }
        return {
          id: tournament._id.toString(),
          ...tournament.toObject(),
        };
      } catch (error) {
        console.error('Error fetching tournament:', error);
        throw new Error('Failed to fetch tournament');
      }
    },
  },
  Mutation: {
    // Add a new user
    addUser: async (_, { username, email, password, role }) => {
      try {
        const user = new User({ username, email, password, role });
        const newUser = await user.save();
        return {
          id: newUser._id.toString(),
          ...newUser.toObject(),
        };
      } catch (error) {
        console.error('Error adding user:', error);
        throw new Error('Failed to add user');
      }
    },
    // Update an existing user
    updateUser: async (_, { id, ...update }) => {
      try {
        const updatedUser = await User.findByIdAndUpdate(id, update, { new: true });
        if (!updatedUser) {
          throw new Error(`User with ID ${id} not found`);
        }
        return {
          id: updatedUser._id.toString(),
          ...updatedUser.toObject(),
        };
      } catch (error) {
        console.error('Error updating user:', error);
        throw new Error('Failed to update user');
      }
    },
    // Delete a user
    deleteUser: async (_, { id }) => {
      try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
          throw new Error(`User with ID ${id} not found`);
        }
        return {
          id: deletedUser._id.toString(),
          ...deletedUser.toObject(),
        };
      } catch (error) {
        console.error('Error deleting user:', error);
        throw new Error('Failed to delete user');
      }
    },
    // Add a new player
    addPlayer: async (_, { userId, ranking, tournaments }) => {
      try {
        const player = new Player({
          user: userId, // Reference to User ID
          ranking,
          tournaments: tournaments || [], // Default to an empty array if not provided
        });

        const newPlayer = await player.save();

        // Populate the user field to include user details
        const populatedPlayer = await Player.findById(newPlayer._id).populate('user').populate('tournaments');

        // Convert ObjectId fields to strings
        return {
          id: populatedPlayer._id.toString(),
          user: {
            id: populatedPlayer.user._id.toString(), // Convert user ID to string
            username: populatedPlayer.user.username,
            email: populatedPlayer.user.email,
          },
          ranking: populatedPlayer.ranking,
          tournaments: populatedPlayer.tournaments.map((tournament) => ({
            id: tournament._id.toString(), // Convert tournament ID to string
            name: tournament.name,
          })),
        };
      } catch (error) {
        console.error('Error adding player:', error);
        throw new Error('Failed to add player');
      }
    },
    // Update an existing player
    updatePlayer: async (_, { id, ...update }) => {
      try {
        const updatedPlayer = await Player.findByIdAndUpdate(id, update, { new: true });
        if (!updatedPlayer) {
          throw new Error(`Player with ID ${id} not found`);
        }
        return {
          id: updatedPlayer._id.toString(),
          ...updatedPlayer.toObject(),
        };
      } catch (error) {
        console.error('Error updating player:', error);
        throw new Error('Failed to update player');
      }
    },
    // Delete a player
    deletePlayer: async (_, { id }) => {
      try {
        const deletedPlayer = await Player.findByIdAndDelete(id).populate('user').populate('tournaments');

        if (!deletedPlayer) {
          throw new Error(`Player with ID ${id} not found`);
        }

        // Convert ObjectId fields to strings
        return {
          id: deletedPlayer._id.toString(),
          user: {
            id: deletedPlayer.user._id.toString(), // Convert user ID to string
            username: deletedPlayer.user.username,
            email: deletedPlayer.user.email,
          },
          ranking: deletedPlayer.ranking,
          tournaments: deletedPlayer.tournaments.map((tournament) => ({
            id: tournament._id.toString(), // Convert tournament ID to string
            name: tournament.name,
          })),
        };
      } catch (error) {
        console.error('Error deleting player:', error.message);
        throw new Error('Failed to delete player');
      }
    },
    // Add a new tournament
    addTournament: async (_, { name, game, date, players, status }) => {
      try {
        const tournament = new Tournament({
          name,
          game,
          date,
          players, // Array of Player ObjectIds
          status, // Must be one of 'Upcoming', 'Ongoing', 'Completed'
        });

        const newTournament = await tournament.save();

        // Populate the players field to include player details
        const populatedTournament = await Tournament.findById(newTournament._id).populate({
          path: 'players',
          populate: { path: 'user' }, // Populate user details for each player
        });

        // Convert ObjectId fields to strings
        return {
          id: populatedTournament._id.toString(),
          name: populatedTournament.name,
          game: populatedTournament.game,
          date: populatedTournament.date.toISOString(),
          players: populatedTournament.players.map((player) => ({
            id: player._id.toString(), // Convert player ID to string
            user: {
              id: player.user._id.toString(), // Convert user ID to string
              username: player.user.username,
              email: player.user.email,
            },
            ranking: player.ranking,
          })),
          status: populatedTournament.status,
        };
      } catch (error) {
        console.error('Error adding tournament:', error);
        throw new Error('Failed to add tournament');
      }
    },
    // Update an existing tournament
    updateTournament: async (_, { id, name, game, date, players, status }) => {
      try {
        console.log('Input Parameters:', { id, name, game, date, players, status });

        // Check if the tournament exists
        const tournament = await Tournament.findById(id);
        if (!tournament) {
          throw new Error(`Tournament with ID ${id} not found`);
        }

        // Prepare the update fields
        const updateFields = {};
        if (name !== undefined) updateFields.name = name;
        if (game !== undefined) updateFields.game = game;
        if (date !== undefined) updateFields.date = new Date(date);
        if (players !== undefined) {
          // Validate player IDs
          const validPlayers = await Player.find({ _id: { $in: players } });
          if (validPlayers.length !== players.length) {
            throw new Error('One or more Player IDs are invalid');
          }
          updateFields.players = players;
        }
        if (status !== undefined) updateFields.status = status;

        console.log('Update Fields:', updateFields);

        // Update the tournament
        const updatedTournament = await Tournament.findByIdAndUpdate(id, updateFields, { new: true })
          .populate({
            path: 'players',
            populate: { path: 'user' }, // Populate user details for each player
          });

        if (!updatedTournament) {
          throw new Error(`Failed to update tournament with ID ${id}`);
        }

        console.log('Updated Tournament:', updatedTournament);

        // Convert ObjectId fields to strings
        return {
          id: updatedTournament._id.toString(),
          name: updatedTournament.name,
          game: updatedTournament.game,
          date: updatedTournament.date.toISOString(),
          players: updatedTournament.players.map((player) => ({
            id: player._id.toString(), // Convert player ID to string
            user: {
              id: player.user._id.toString(), // Convert user ID to string
              username: player.user.username,
              email: player.user.email,
            },
            ranking: player.ranking,
          })),
          status: updatedTournament.status,
        };
      } catch (error) {
        console.error('Error updating tournament:', error.message);
        throw new Error('Failed to update tournament');
      }
    },
    // Delete a tournament
    deleteTournament: async (_, { id }) => {
      try {
        const deletedTournament = await Tournament.findByIdAndDelete(id).populate({
          path: 'players',
          populate: { path: 'user' }, // Populate user details for each player
        });

        if (!deletedTournament) {
          throw new Error(`Tournament with ID ${id} not found`);
        }

        // Convert ObjectId fields to strings
        return {
          id: deletedTournament._id.toString(),
          name: deletedTournament.name,
          game: deletedTournament.game,
          date: deletedTournament.date.toISOString(),
          players: deletedTournament.players.map((player) => ({
            id: player._id.toString(), // Convert player ID to string
            user: {
              id: player.user._id.toString(), // Convert user ID to string
              username: player.user.username,
              email: player.user.email,
            },
            ranking: player.ranking,
          })),
          status: deletedTournament.status,
        };
      } catch (error) {
        console.error('Error deleting tournament:', error.message);
        throw new Error('Failed to delete tournament');
      }
    },
  },
};

module.exports = resolvers;