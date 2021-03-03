using ClimbTrackApi.Persistence.Models;

namespace Test.Common.Builders
{
    public class StyleBuilder
    {
        private Style style = new Style
        {
            Id = 1,
            Description = "Crimpy",
        };
        
        public Style Build()
        {
            return style;
        }
    }
}
