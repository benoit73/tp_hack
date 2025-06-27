module.exports = (sequelize, DataTypes) => {
  const Hackathon = sequelize.define('Hackathon', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isAfterStartDate(value) {
          if (value <= this.start_date) {
            throw new Error('End date must be after start date');
          }
        }
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
    tableName: 'hackathons',
    timestamps: true
  });

  Hackathon.associate = function(models) {
    Hackathon.belongsTo(models.User, { foreignKey: 'created_by', as: 'organizer' });
    Hackathon.hasMany(models.Project, { foreignKey: 'hackathon_id', as: 'projects' });
  };

  return Hackathon;
};