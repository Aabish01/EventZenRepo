const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;

//  check JWT authentication
exports.authenticate = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Access Denied" });

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), SECRET);
        req.user = decoded; // Attach data to request
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid Token" });
    }
    console.log("JWT Token:", token); 
};

//  authorize admin users
exports.authorizeAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access Denied. Admins only." });
    }
    next();
};
