module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define('Team', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: 'projects',
        key: 'id'
      }
    },
    team_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'teams',
    timestamps: true
  });

  Team.associate = function(models) {
    Team.belongsTo(models.Project, { foreignKey: 'project_id', as: 'project' });
    Team.hasMany(models.TeamMember, { foreignKey: 'team_id', as: 'members' });
    Team.hasMany(models.Score, { foreignKey: 'team_id', as: 'scores' });
    Team.belongsToMany(models.User, { 
      through: models.TeamMember, 
      foreignKey: 'team_id', 
      otherKey: 'user_id',
      as: 'participants'
    });
  };

  return Team;
};