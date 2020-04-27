using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class AddClimbingSessionAndClimb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Styles",
                table: "Styles");

            migrationBuilder.RenameTable(
                name: "Styles",
                newName: "Style");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Style",
                table: "Style",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "ClimbingSessions",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    DateTime = table.Column<DateTime>(nullable: false),
                    MaxGrade = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClimbingSessions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Climb",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Grade = table.Column<string>(nullable: true),
                    StyleId = table.Column<int>(nullable: true),
                    ClimbingSessionId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Climb", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Climb_ClimbingSessions_ClimbingSessionId",
                        column: x => x.ClimbingSessionId,
                        principalTable: "ClimbingSessions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Climb_Style_StyleId",
                        column: x => x.StyleId,
                        principalTable: "Style",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Climb_ClimbingSessionId",
                table: "Climb",
                column: "ClimbingSessionId");

            migrationBuilder.CreateIndex(
                name: "IX_Climb_StyleId",
                table: "Climb",
                column: "StyleId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Climb");

            migrationBuilder.DropTable(
                name: "ClimbingSessions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Style",
                table: "Style");

            migrationBuilder.RenameTable(
                name: "Style",
                newName: "Styles");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Styles",
                table: "Styles",
                column: "Id");
        }
    }
}
