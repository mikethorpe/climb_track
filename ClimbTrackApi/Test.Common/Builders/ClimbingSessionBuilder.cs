using ClimbTrackApi.Persistence.Models;
using System;
using System.Collections.Generic;

namespace Test.Common.Builders
{
    public class ClimbingSessionBuilder
    {
        private ClimbingSession climbingSession = new ClimbingSession
        {
            DateTime = new DateTime(2021, 02, 17, 10, 10, 10),
            MaxGrade = "7A",
            UserId = 1,
            Climbs = new List<Climb>
            {
                new Climb
                {
                    Grade = "7A",
                    //Style = new Style { Id = 1 }
                    StyleId = 1
                }
            }
        };

        public ClimbingSessionBuilder WithUserId(int userId)
        {
            climbingSession.UserId = userId;
            return this;
        }

        public ClimbingSession Build()
        {
            return climbingSession;
        }
    }
}
