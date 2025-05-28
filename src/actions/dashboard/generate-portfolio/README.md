# Portfolio Generation System

This system provides a complete solution for generating portfolio data using Google Gemini AI and saving it to the database according to the Prisma schema structure.

## Overview

The portfolio generation system consists of three main components:

1. **AI Content Generation** (`generate-content.ts`) - Defines the JSON schema for Google Gemini AI
2. **Portfolio Data Processing** (`generate-portfolio.ts`) - Handles data validation and database storage
3. **Example Usage** (`example-usage.ts` & `test-portfolio.ts`) - Provides sample implementations

## Files Structure

```
src/actions/dashboard/generate-portfolio/
├── generate-portfolio.ts     # Main implementation
├── example-usage.ts         # Usage examples
├── test-portfolio.ts        # Test data and functions
└── README.md               # This documentation

src/actions/gemini/
└── generate-content.ts     # AI schema definition
```

## How It Works

### 1. AI Schema Definition (`generate-content.ts`)

The AI schema defines the expected JSON structure that Google Gemini AI should generate. It includes:

- **User Information**: name, email, bio, profile image
- **Profile Details**: full name, professional title, location, etc.
- **Languages**: with proficiency levels (BEGINNER, INTERMEDIATE, ADVANCED, NATIVE)
- **Skills**: categorized by type (PROGRAMMING_LANGUAGE, DESIGN_TOOL, FRAMEWORK, OTHER)
- **Projects**: with categories, statuses, images, and tools
- **Experiences**: work history with roles and companies
- **Education**: degrees, certifications, and courses
- **Achievements**: awards and recognitions
- **Testimonials**: feedback from colleagues and clients

### 2. Data Validation and Enum Conversion

The system includes robust validation functions that convert AI-generated string values to proper Prisma enum types:

#### Language Level Validation
- Maps variations like "basic" → BEGINNER, "fluent" → ADVANCED, "mother_tongue" → NATIVE

#### Skill Category Validation
- Maps variations like "programming" → PROGRAMMING_LANGUAGE, "design" → DESIGN_TOOL

#### Project Category Validation
- Maps variations like "web_development" → DEVELOPMENT, "ui" → UI_UX

#### Project Status Validation
- Maps variations like "completed" → FEATURED, "team" → COLLABORATIVE

#### Education Type Validation
- Maps variations like "university" → DEGREE, "certificate" → CERTIFICATION

### 3. Database Operations

The system uses Prisma transactions to ensure data consistency when saving:

1. **User Updates**: Basic user information (name, bio, profile image)
2. **Profile Management**: Create or update user profile with all details
3. **Languages**: Save language proficiency data
4. **Skills**: Smart duplicate handling for skills and user-skill relationships
5. **Projects**: Save projects with associated images and tools
6. **Experiences**: Save work history with date validation
7. **Education**: Save educational background with type validation
8. **Achievements**: Save awards and recognitions
9. **Testimonials**: Save feedback and ratings

## Usage

### Basic Usage

```typescript
import generatePortfolio from '@/actions/dashboard/generate-portfolio/generate-portfolio';

const portfolioData = {
  user: {
    name: "John Doe",
    email: "john@example.com",
    profile: {
      fullName: "John Doe",
      professionalTitle: "Full Stack Developer",
      // ... other profile fields
    },
    languages: [
      { name: "English", level: "native" },
      { name: "Spanish", level: "intermediate" }
    ],
    skills: [
      { name: "JavaScript", category: "programming_language" },
      { name: "React", category: "framework" }
    ],
    // ... other arrays
  }
};

const result = await generatePortfolio(portfolioData);
```

### Testing

Use the test file to verify the complete workflow:

```typescript
import { runPortfolioTest } from '@/actions/dashboard/generate-portfolio/test-portfolio';

// Run the test (make sure user is authenticated first)
const result = await runPortfolioTest();
```

## Error Handling

The system includes comprehensive error handling:

- **Authentication**: Checks for valid user session
- **JSON Parsing**: Handles malformed JSON in socials field
- **Date Conversion**: Validates and converts date strings
- **Enum Validation**: Converts invalid enum values to safe defaults
- **Database Transactions**: Ensures atomicity of all operations

## Validation Features

### Enum Validation with Fallbacks

All enum fields have intelligent validation with fallback values:

- Invalid language levels default to `BEGINNER`
- Invalid skill categories default to `OTHER`
- Invalid project categories default to `OTHER`
- Invalid project statuses default to `IN_PROGRESS`
- Invalid education types default to `COURSE`

### Smart Skill Handling

The system prevents duplicate skills by:
1. Checking if a skill with the same name and category exists
2. Creating new skills only if they don't exist
3. Managing user-skill relationships separately

### Date Handling

Dates are automatically converted from strings to Date objects with error handling for invalid formats.

## Response Format

The function returns a detailed response including:

```typescript
{
  success: true,
  message: "Portfolio generated successfully",
  summary: {
    user: "John Doe",
    email: "john@example.com",
    hasProfile: true,
    languagesCount: 2,
    skillsCount: 5,
    projectsCount: 3,
    experiencesCount: 2,
    educationsCount: 1,
    achievementsCount: 2,
    testimonialsCount: 1
  }
}
```

## Requirements

- **Authentication**: User must be logged in
- **Database**: PostgreSQL with Prisma schema
- **Runtime**: Bun.js for package management and runtime

## Integration with AI

To integrate with Google Gemini AI:

1. Use the schema from `generate-content.ts` in your AI prompt
2. Parse the AI response JSON
3. Pass the parsed data to `generatePortfolio()`
4. Handle the response and show user feedback

## Best Practices

1. **Always authenticate** users before calling the function
2. **Validate AI responses** before processing
3. **Handle errors gracefully** and provide user feedback
4. **Test thoroughly** with various data combinations
5. **Monitor logs** for validation warnings and errors

## Troubleshooting

### Common Issues

1. **Enum Validation Warnings**: Check console for mapping suggestions
2. **Date Parse Errors**: Ensure dates are in valid format (YYYY-MM-DD)
3. **Authentication Errors**: Verify user session is valid
4. **Database Errors**: Check Prisma schema matches the code

### Debug Mode

Enable detailed logging by checking the console for validation warnings and database operation status.
