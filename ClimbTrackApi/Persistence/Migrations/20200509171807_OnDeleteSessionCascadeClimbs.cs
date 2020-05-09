using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class OnDeleteSessionCascadeClimbs : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Climb_ClimbingSessions_ClimbingSessionId",
                table: "Climb");

            migrationBuilder.AddForeignKey(
                name: "FK_Climb_ClimbingSessions_ClimbingSessionId",
                table: "Climb",
                column: "ClimbingSessionId",
                principalTable: "ClimbingSessions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Climb_ClimbingSessions_ClimbingSessionId",
                table: "Climb");

            migrationBuilder.AddForeignKey(
                name: "FK_Climb_ClimbingSessions_ClimbingSessionId",
                table: "Climb",
                column: "ClimbingSessionId",
                principalTable: "ClimbingSessions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
