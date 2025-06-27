module.exports = (sequelize, DataTypes) => {
  const TeamMember = sequelize.define('TeamMember', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    team_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'teams',
        key: 'id'
      }
    },
    joined_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'team_members',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['user_id', 'team_id']
      }
    ]
  });

  TeamMember.associate = function(models) {
    TeamMember.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    TeamMember.belongsTo(models.Team, { foreignKey: 'team_id', as: 'team' });
  };

  return TeamMember;
};