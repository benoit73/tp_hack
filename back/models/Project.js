module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    hackathon_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'hackathons',
        key: 'id'
      }
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    tableName: 'projects',
    timestamps: true
  });

  Project.associate = function(models) {
    Project.belongsTo(models.Hackathon, { foreignKey: 'hackathon_id', as: 'hackathon' });
    Project.belongsTo(models.User, { foreignKey: 'created_by', as: 'creator' });
    Project.hasOne(models.Team, { foreignKey: 'project_id', as: 'team' });
  };

  return Project;
};