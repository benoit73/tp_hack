module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    role: {
      type: DataTypes.ENUM('organizer', 'participant', 'jury'),
      allowNull: false,
      defaultValue: 'participant'
    }
  }, {
    tableName: 'users',
    timestamps: true
  });

  User.associate = function(models) {
    User.hasMany(models.Hackathon, { foreignKey: 'created_by', as: 'organizedHackathons' });
    User.hasMany(models.Project, { foreignKey: 'created_by', as: 'createdProjects' });
    User.hasMany(models.TeamMember, { foreignKey: 'user_id', as: 'teamMemberships' });
    User.hasMany(models.Score, { foreignKey: 'jury_id', as: 'givenScores' });
    User.belongsToMany(models.Team, { 
      through: models.TeamMember, 
      foreignKey: 'user_id', 
      otherKey: 'team_id',
      as: 'teams'
    });
  };

  return User;
};