using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class AddPendingChanges : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsVerified",
                table: "Users",
                newName: "IsVerifiedLogin");

            migrationBuilder.AddColumn<bool>(
                name: "IsVerifiedEmail",
                table: "Users",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsVerifiedEmail",
                table: "Users");

            migrationBuilder.RenameColumn(
                name: "IsVerifiedLogin",
                table: "Users",
                newName: "IsVerified");
        }
    }
}
