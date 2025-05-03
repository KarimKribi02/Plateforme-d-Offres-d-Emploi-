const nodemailer = require('nodemailer');

// Configure email transport for testing (replace with real SMTP config for production)
const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false,
  auth: {
    user: 'test@example.com', // replace with real credentials in production
    pass: 'password'
  }
});

// Store notification records in memory (replace with database in production)
const notifications = [];

/**
 * Notify recruiter about a new job application
 */
const notifyRecruiter = async (candidatureData) => {
  try {
    const { offreId, candidatId, message, entrepriseId } = candidatureData;
    
    // In a real application, fetch recruiter email from database
    // For example by querying the entreprise service with entrepriseId
    const recruiterEmail = `recruiter-${entrepriseId}@example.com`;
    
    // Create notification record
    const notification = {
      id: Date.now(),
      type: 'candidature.created',
      recipient: recruiterEmail,
      data: candidatureData,
      createdAt: new Date()
    };
    
    notifications.push(notification);
    
    // Send email notification
    const mailOptions = {
      from: 'notifications@jobplatform.com',
      to: recruiterEmail,
      subject: `Nouvelle candidature pour l'offre #${offreId}`,
      html: `
        <h1>Nouvelle candidature reçue</h1>
        <p>Vous avez reçu une nouvelle candidature pour l'offre #${offreId}.</p>
        <p>Candidat: ${candidatId}</p>
        <p>Message: ${message}</p>
        <p>Connectez-vous à votre espace recruteur pour voir les détails.</p>
      `
    };
    
    await transporter.sendMail(mailOptions);
    console.log(`✅ Notification sent to recruiter ${recruiterEmail}`);
    
    return notification;
  } catch (error) {
    console.error('Error sending recruiter notification:', error);
    throw error;
  }
};

/**
 * Notify candidate about application status change
 */
const notifyCandidate = async (candidatureData) => {
  try {
    const { candidatId, offreId, statut } = candidatureData;
    
    // In a real application, fetch candidate email from database
    const candidateEmail = `candidate-${candidatId}@example.com`;
    
    // Create notification record
    const notification = {
      id: Date.now(),
      type: 'candidature.updated',
      recipient: candidateEmail,
      data: candidatureData,
      createdAt: new Date()
    };
    
    notifications.push(notification);
    
    // Get status message
    let statusMessage = 'mise à jour';
    switch (statut) {
      case 'acceptée':
        statusMessage = 'acceptée! Félicitations!';
        break;
      case 'refusée':
        statusMessage = 'refusée. Nous vous encourageons à postuler à d\'autres offres.';
        break;
      case 'en attente d\'entretien':
        statusMessage = 'en attente d\'entretien. Vous serez bientôt contacté.';
        break;
      default:
        statusMessage = `changée à "${statut}"`;
    }
    
    // Send email notification
    const mailOptions = {
      from: 'notifications@jobplatform.com',
      to: candidateEmail,
      subject: `Mise à jour de votre candidature #${offreId}`,
      html: `
        <h1>Votre candidature a été mise à jour</h1>
        <p>Votre candidature pour l'offre #${offreId} a été ${statusMessage}</p>
        <p>Connectez-vous à votre espace candidat pour plus de détails.</p>
      `
    };
    
    await transporter.sendMail(mailOptions);
    console.log(`✅ Notification sent to candidate ${candidateEmail}`);
    
    return notification;
  } catch (error) {
    console.error('Error sending candidate notification:', error);
    throw error;
  }
};

/**
 * Get all notifications (for testing/admin purposes)
 */
const getAllNotifications = () => {
  return notifications;
};

module.exports = {
  notifyRecruiter,
  notifyCandidate,
  getAllNotifications
}; 